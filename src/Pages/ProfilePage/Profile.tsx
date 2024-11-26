import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context/AuthContext';
import { getSchedules } from '../../Graph/Schedules/Service';
import EventCard from '../../Components/EventCard/EventCard';

interface User {
  "@odata.context": string;
  displayName: string;
  mail: string;
  id: string;
}

const { height } = Dimensions.get('window');

const ProfilePage = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { SignOut } = useContext(AuthContext);
  const [response, setResponse] = useState<null | any>(null);


  const getData = useCallback(async() => {
    try {
      setLoading(true);
      let date = new Date();

      // Set startDate to the beginning of today (midnight)
      let startDate = new Date(date.setHours(0, 0, 0, 0));

      // Set endDate to 7 days from the start date
      let endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);

      const response = await getSchedules(startDate, endDate);

      setResponse(response);


    } catch (error) {
      Alert.alert(
        'Error getting events',
        JSON.stringify(error),
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }finally{
      setLoading(false);
    }
  },[])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let user_data: any = await AsyncStorage.getItem('user_data');
        setUser(JSON.parse(user_data));
      } catch (err: any) {
        setError(err);
      } finally {
        //setLoading(false);
      }
    };
    fetchUser();
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../Images/profile.png')} // Local image
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{user?.displayName}</Text>
        <Text style={styles.userEmail}>{user?.mail}</Text>
      </View>

      {/* Logout button at the top-right */}
      <TouchableOpacity style={styles.logoutButton} onPress={SignOut}>
        <MaterialCommunityIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={{flex:1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        { response && response.map((event:any) => <EventCard key={event.id} event={event}/>) }
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    //padding: 50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  userEmail: {
    fontSize: 16,
    color: '#000000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0078D4',
    padding: 5,
    borderRadius: 8,
    width: 150,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  // New style for logout button at the top-right
  logoutButton: {
    position: 'absolute',
    top: '2%',
    right: 20,
    backgroundColor: '#0078D4',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ProfilePage;
