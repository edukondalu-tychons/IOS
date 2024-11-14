import React, {Suspense} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingPage from '../../../Pages/LoadingPage/LoadingPage';
import LoginPage from '../../../Pages/LoginPage/LoginPage';


const Stack = createNativeStackNavigator();

// animationTypeForReplace: state.isSignout ? 'pop' : 'push'

const AuthStack = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false, animationTypeForReplace: 'pop' }} />  
      </Stack.Navigator>
    </Suspense>
  );
};

export default AuthStack;
