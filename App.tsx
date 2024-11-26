import React, { useEffect } from 'react'
import { AuthProvider } from './src/Context/AuthContext'
import NavigationStack from './src/NavigationStack/StackNavigation/NavigationStack'
import { DeviceEventEmitter, PermissionsAndroid, Platform } from 'react-native'
import { NativeModules } from 'react-native';
const { LocationModule } = NativeModules;

const App = () => {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  )
}

export default React.memo(App)

