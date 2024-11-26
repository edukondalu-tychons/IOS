import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePage from '../../Pages/ProfilePage/Profile';
import MapScreen from '../../Pages/MapScreen/MapScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Profile" component={ProfilePage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen name="Home" component={MapScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
  );
}

export default BottomNavigation;
