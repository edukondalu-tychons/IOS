import * as Keychain from 'react-native-keychain';
import {compareAsc, parseISO, sub} from 'date-fns';
import {refresh} from 'react-native-app-auth';
import { config } from '../Auth/AuthConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Credentials {
  userToken: string | null;
  refreshToken: string | null;
  expireTime: string | null;
  // id: string;
}

// const SERVICE_NAME = 'com.tychons.AzureAuth';

export const storeAzureToken = async (credentials: Credentials): Promise<void> => {
  try {
    await Keychain.setGenericPassword('azureToken', JSON.stringify(credentials)); 
    // {
    //   service: SERVICE_NAME,
    //   // You can uncomment these options based on your needs
    //   // accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    //   // accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    // });
    console.log('Azure auth token stored successfully');
  } catch (error:any) {
    console.error('Failed to store Azure auth token:', error.message);
    throw new Error(`Failed to store Azure auth token: ${error.message}`);
  }
};

export const refreshAzureToken = async (): Promise<void> => {
  const storeData: any = await retrieveAzureToken();
  const credentials: Credentials = JSON.parse(storeData);
  if (credentials?.expireTime !== null) {
    // Get expiration time - 5 minutes
    // If it's <= 5 minutes before expiration, then refresh
    const expire = sub(parseISO(credentials?.expireTime), {minutes: 5});
    const now = new Date();

    if (compareAsc(now, expire) >= 0) {
      // Expired, refresh
      console.log('Refreshing token Expired');
      // const refreshToken = await AsyncStorage.getItem('refreshToken');
      //console.log(`Refresh token: ${credentials?.refreshToken}`);
      const result = await refresh(config, {
        refreshToken: credentials?.refreshToken || '',
      });
      if (result) {
        await storeAzureToken({
          userToken: result.accessToken,
          refreshToken: result.refreshToken,
          expireTime: result.accessTokenExpirationDate,
          // id: result.idToken,
        });
        //console.log(`New token: ${result?.refreshToken}`);
        return;
      }
      return;
    }
    return;
  }
};

export const retrieveAzureToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error retrieving Azure auth token', error);
    return null;
  }
};

export const deleteAzureToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
    await AsyncStorage.clear();
    console.log('Azure auth token deleted successfully');
  } catch (error) {
    console.error('Failed to delete Azure auth token', error);
  }
};

// await Keychain.setGenericPassword(username, password, {
//   accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
//   accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY, // For Face ID/Touch ID
// });