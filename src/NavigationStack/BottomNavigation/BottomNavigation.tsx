import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import MapScreen from '../../Pages/MapScreen/MapScreen';
import ProfilePage from '../../Pages/ProfilePage/Profile';


type RouteName = 'Home' | 'Schedules' | 'Create' | 'Notification' | 'Profile' | 'Calender';

const ICONS: Record<RouteName, string> = {
  Home: 'home',
  Schedules: 'calendar-clock',
  Create: 'plus-box',
  Notification: 'bell',
  Profile: 'account',
  Calender: 'calendar-month',
  //Schedules: 'note-text'
};

const Tab = createMaterialBottomTabNavigator();


const BottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      //activeColor={colors.activeIcon}
      //inactiveColor={colors.icon}
      barStyle={[styles.barStyle, {
        //backgroundColor: colors.background
      }]}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const iconName = ICONS[route.name as RouteName] || 'home';
          return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
        },
        //tabBarColor: 'red',
      })}>
       
      <Tab.Screen name="Home" component={ProfilePage} />
      <Tab.Screen name="Calender" component={MapScreen}   />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    paddingBottom: 5, // Add some padding at the bottom
    borderTopWidth: 0.2, // Add border at the top of the tab bar
    borderTopColor: '#999', // Border color
  },
})


export default BottomNavigation
