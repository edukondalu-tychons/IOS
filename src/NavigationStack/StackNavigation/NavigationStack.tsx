import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack/AuthStack';
import { AuthContext } from '../../Context/AuthContext';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';
import BottomNavigation from '../BottomNavigation/BottomNavigation';


const NavigationStack = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <NavigationContainer>
      {userToken ? <BottomNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;
