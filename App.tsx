import React from 'react'
import { AuthProvider } from './src/Context/AuthContext'
import NavigationStack from './src/NavigationStack/StackNavigation/NavigationStack'

const App = () => {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  )
}

export default React.memo(App)
