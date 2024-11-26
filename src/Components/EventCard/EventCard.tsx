import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

const { height } = Dimensions.get('window');

interface EventCardProps {
  event: {
    subject: string;
    start: { dateTime: string };
    end: { dateTime: string };
    location: string;
    organizer: { emailAddress: { name: string } };
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDateTime = useCallback((dateTime: string) => {
    return format(new Date(dateTime), 'MM/dd/yyyy h:mm a');
  }, []);

  const formatDateEndTime = useCallback((dateTime: string) => {
    return format(new Date(dateTime), 'h:mm a');
  }, []);

  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl }} style={styles.cardImage} /> */}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{event.subject || ''}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.cardDate}>{formatDateTime(event.start.dateTime) || ''} - </Text>
          <Text style={styles.cardDate}>{formatDateEndTime(event.end.dateTime) || ''}</Text>
        </View>
        <View style={styles.organizerContainer}>
          <Text style={styles.cardDescription}>Organizer: {event.organizer.emailAddress.name || ''}</Text>
          <TouchableOpacity>
            <Text style={[styles.cardDescription, styles.linkText]}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginHorizontal: 20,
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
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cardDate: {
    fontSize: height * 0.015,
    color: '#000',
  },
  organizerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDescription: {
    fontSize: height * 0.018,
    color: '#333',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#0078D4',
  },
});

export default EventCard;