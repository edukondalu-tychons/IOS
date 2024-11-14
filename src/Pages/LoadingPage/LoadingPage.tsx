import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const LoadingPage = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={'large'} />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        display:'flex',
        height:'100%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    }
})
export default LoadingPage