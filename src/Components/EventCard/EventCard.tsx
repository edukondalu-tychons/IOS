import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  //description: string;
 // imageUrl: string;
//   onRSVP: () => void;
//   onDetails: () => void;
}

const EventCard: React.FC<any> = ({event}) => {
    const formatDateTime = useCallback((dateTime: string) => {
        return format(new Date(dateTime), 'MM/dd/yyyy h:mm a');
      },[]);

      const formatDateEndTime = useCallback((dateTime: string) => {
        return format(new Date(dateTime), 'h:mm a');
      },[]);
    
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl }} style={styles.cardImage} /> */}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{event.subject || ''}</Text>
        <View style={{flexDirection:'row'}}>
           <Text style={styles.cardDate}>{formatDateTime(event.start.dateTime) || ''} - </Text>
           <Text style={styles.cardLocation}>{formatDateEndTime(event.end.dateTime) || ''}</Text>
        </View>
        <Text style={styles.cardTitle}>organizer : { event.organizer.emailAddress.name || ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginHorizontal:20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  cardDate: {
    fontSize: 16,
    color: '#000000',
  },
  cardLocation: {
    fontSize: 16,
    color: '#000000',
    //marginLeft:10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0078D4', // Microsoft Blue
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
    width: '48%',
  },
  detailsButton: {
    backgroundColor: '#F3F2F1', // Light grey for details button
    borderWidth: 1,
    borderColor: '#0078D4',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EventCard;
