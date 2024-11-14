import AsyncStorage from '@react-native-async-storage/async-storage';
import graphClient from '../GraphAuthProvider';
import {refreshAzureToken} from '../../Utils/keychainUtils';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { parseISO, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const getUserData = async () => {
  try {
    const userData = await graphClient
      .api('/me')
      .select('displayName,mail,id')
      .get();
    //console.log(`userData@1`, userData);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    return
  } catch (err: any) {
    throw Error('Getting Error while fetching data');
  }
};

export const formatDateTimeInTimeZone = (utcDateString:string) => {
  // Get user's time zone automatically
  const timeZone:any = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Parse the UTC date-time string
  const parsedDate = parseISO(utcDateString);

  // Convert to the specified time zone
  const localDate = toZonedTime(parsedDate, timeZone); // Use toZonedTime instead of utcToZonedTime

  // Format the local date to a readable string
  const formattedDate = format(localDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

  return formattedDate;
}

export const getSchedules = async (startDate: Date, endDate: Date): Promise<MicrosoftGraph.Event> => {
  await refreshAzureToken();  // Refresh the authentication token
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    let events: any = [];
    let response = await graphClient
      .api('/me/calendarView') 
      .header('Prefer', `outlook.timezone="${tz}"`)  // Set user's timezone
      .query({
        startDateTime: startDate.toISOString(),   // Start date
        endDateTime: endDate.toISOString(),       // End date
      })
      .select('subject,organizer,start,end,id,attendees')   // Limit returned fields
      .orderby('start/dateTime')                  // Order by start date
      .get();

    // Add events to the array
    events = events.concat(response.value);

    // Paginate through remaining events if necessary
    while (response['@odata.nextLink']) {
      response = await graphClient.api(response['@odata.nextLink']).get();
      events = events.concat(response.value);
    }

    return events;  // Return full list of events

  } catch (err: any) {
    console.log('Error fetching events:', err);  // Log error
    throw new Error(err?.message);
  }
};


export const getSchdule = async (eventId: string): Promise<MicrosoftGraph.Event> => {
  try {
    await refreshAzureToken();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const eventData = await graphClient
      .api(`/me/calendar/events/${eventId}`)
      .header('Prefer', `outlook.timezone="${tz}"`)
      //.select('subject,organizer,start,end,id,location,attendees')
      .get();
      //console.log(`userData`, eventData);
    return eventData; // Directly return the event data
  } catch (error:any) {
    throw new Error(error.message);
  }
  
};

export const createEvent = async (newEvent: MicrosoftGraph.Event): Promise<MicrosoftGraph.Event> => {
  try {
    await refreshAzureToken();
    const res: MicrosoftGraph.Event = await graphClient.api('/me/events').post(newEvent);
    return res;
  } catch (error: any) {
    console.error(`createEvent error`, error);
    throw new Error(error.message);
  }
};

export const getUpdateSchdule = async (eventId:string, updateEvent: any) => {
  try {
    await refreshAzureToken();
    const eventData = await graphClient
      .api(`/me/calendar/events/${eventId}`)
      .patch(updateEvent)
      //console.log(`userData`, eventData);
    return eventData; // Directly return the event data
  } catch (error:any) {
    throw new Error(error.message);
  }
  
}

export const getDeleteSchdule = async (eventId:string) => {
  try {
    await refreshAzureToken();
    const eventData = await graphClient
      .api(`/me/calendar/events/${eventId}`)
      .delete()
      //console.log(`userData`, eventData);
    return eventData; // Directly return the event data
  } catch (error:any) {
    throw new Error(error.message);
  }
  
}

export const getUsers = async () => {
  try {
    const response = await graphClient.api('/users')
      .select('mail,userPrincipalName')
      .get();
    console.log(`users`, response);
    //await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    return;
  } catch (err: any) {
    throw Error('Getting Error while fetching data');
  }
};

export const uploadFileToEvent = async (eventId: string, file: any) => {
  try {
    // Step 1: Create an upload session for the file
    const uploadSession = await graphClient
      .api(`/me/drive/root:/${file.name}:/createUploadSession`)
      .post({
        '@microsoft.graph.conflictBehavior': 'rename',
      });

    // Step 2: Upload the file to the created session
    await fetch(uploadSession.uploadUrl, {
      method: 'PUT',
      body: file,
    });

    // Step 3: Attach the uploaded file to the calendar event
    await graphClient.api(`/me/events/${eventId}/attachments`).post({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: file.name,
      contentType: file.type,
      contentBytes: file.base64, // Assuming file is already converted to base64
    });
    // Alert.alert(
    //   'Success',
    //   'File uploaded and attached to the event successfully',
    // );
  } catch (error) {
    //Alert.alert('Error', 'Failed to upload and attach the file');
    console.error('Error uploading and attaching file:', error);
    throw new Error(`Failed to fetch event: ${error.message}`);
  }
};
