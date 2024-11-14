import React, {Suspense, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingPage from '../../../Pages/LoadingPage/LoadingPage';
import BottomNavigation from '../../BottomNavigation/BottomNavigation';


const Stack = createNativeStackNavigator();

// animationTypeForReplace: state.isSignout ? 'pop' : 'push'

const MainStack:React.FC = () => {
  
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => navigation.goBack()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const navigation = useNavigation();
  
  return (
    <Suspense fallback={<LoadingPage />}>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={BottomNavigation} options={{ headerShown: false, animationTypeForReplace: 'pop' }} />
        <Stack.Screen name="RouteMap" component={RideMap} options={{ headerShown: false }} />
        <Stack.Screen name="New event" component={CreateSchedule} />
        <Stack.Screen name="view event" component={ViewSchedule} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </Suspense>
  );
};

export default MainStack; 
