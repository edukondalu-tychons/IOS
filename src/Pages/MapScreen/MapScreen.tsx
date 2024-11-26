import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert, NativeModules } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const { HelloWorldModule } = NativeModules;

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default latitude (San Francisco)
    longitude: -122.4324, // Default longitude (San Francisco)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    console.log(HelloWorldModule.getConstants());
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        showsBuildings
        showsCompass
        showsIndoorLevelPicker
        showsIndoors
        showsMyLocationButton
        showsPointsOfInterest
        showsScale
        showsTraffic
        showsUserLocation
        loadingEnabled
        userLocationCalloutEnabled={false}
        provider='google'
        mapType='standard'
        style={StyleSheet.absoluteFill}
        initialRegion={region}
      >
        {/* Example Marker */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="San Francisco" description="This is where SF is." />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: width,
    height: height * 0.7,
  },
  locationInfo: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapScreen;
