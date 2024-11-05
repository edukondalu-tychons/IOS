import React, { useRef } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import polyline from '@mapbox/polyline';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const mapRef = useRef<MapView>(null); // Correctly type the ref
  const markersList = [{"latitude": 16.547940537490103, "longitude": 81.46571516990662}, {"latitude": 16.571696191122292, "longitude": 81.46369814872742}, {"latitude": 16.644086562020597, "longitude": 81.48859977722168} ]

  const decodePolyline = (encoded: string) => {
    const decoded = polyline.decode(encoded); // Returns an array of [lat, lng] pairs

    // Convert the array to objects with latitude and longitude keys

    return decoded.map((point) => ({
      latitude: point[0],

      longitude: point[1],
    }));
  };

  return (
    <SafeAreaView style={{ flex:1}}>
    <View style={styles.container}>
      <MapView
      style={StyleSheet.absoluteFillObject}
        // mapType="standard"
        //mapType="satellite" // or "hybrid" or "satellite"

        ref={mapRef} // Assign the ref
        provider="google"
        showsCompass
        showsIndoors
        showsTraffic
        showsMyLocationButton
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        showsBuildings
        showsIndoorLevelPicker
        showsPointsOfInterest
        showsScale
        showsUserLocation
        //style={styles.map}
        initialRegion={{
          latitude: 16.54689409018138,
          longitude: 81.4832554757595,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={decodePolyline(
            "mx~cBeuipNf@MDRH^VvBHl@NGj@UfA[pAQF|ARrAVfAl@lB|C|Ih@rBJ`AAj@E`@C^Dx@n@tEj@lFt@jGl@tDbAtFt@~DJ`AHjALvAVxAt@`CHl@N~DVlH?nAk@DcBDaBLcDAyB?gCBoCCqDBwCDcD?wBKqAO}Cq@cBSeAMiAOqBg@cBYiCg@oAQyCOi@GoCm@cAO{@BWFo@\\u@|@SVSJQFW?_@EsIwBqG_BkEcAkBg@SMi@UuAUy@SqAKaEQoAHo@HUHOJaAjAqA|AmCrCqClCqBvBm@h@o@b@KDSJ[FgAT_Dv@sAXe@NiAd@uAb@_Bd@_ANm@AMAAcA@bAq@Wm@c@}@q@YK[GY@u@LcBn@Q?I?WE_@Ok@_@eAk@QG]E]DmB\\W@a@GiAKeAOWOe@sAOc@OWoAsAmAeAyA{@oBqAY]Sm@s@gEOe@IKSGaCBqBC}B?[EWGUISMkAu@WKaB]kCg@eBWu@Ac@@cAPDLPr@Lf@XpABR?^CTYl@_@\\a@Pi@HmAJc@BWCwAk@]YOWCEKCaGYaGYgFQwEEi@EmC]{Eq@cBOwBWcAGeF@c@DkAN}@VuE`BiAXuCf@sCn@y@VcA`@qFpC}A~@sDlCGBmDnC{DvCYV[d@[n@k@r@]PwCb@mFt@aADcBCkGWo@CuB[yIyA_G}@e@EcATqAh@mBl@sC`AcDtAi@PuA`@kA\\mAj@_E`BqEfBcARc@Du@?o@As@Mi@SwAu@kFwCyLqG{OqIeDaBmAi@yFcDaBy@y@g@QIkCuA[We@_A_@a@WG]B{Cj@}@LgBGeDSmB[gDm@cDc@qOaCyGmAeA_M]gCa@aC[mCk@yEi@wC_BoKO_A[gA_ByEm@oCA]De@X}BPyAJyAFcB@gA@m@Di@LYRMVGNGFEBO@oBDoBFgFg@kDAQV{A`@kCn@mD\\oBkCE_@p@"
          )}
          strokeColor={"#0000FF"}
          geodesic={true}
          strokeWidth={10}
          //strokeWidth={this.getRoadWidth()}
          //lineDashPattern={step?.travel_mode === "WALKING" ? lineDashPattern : undefined}

          zIndex={1}
        />
        { markersList.map((location:LatLng) => <Marker key={location.latitude} coordinate={location} />) }
      </MapView>
    </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,     // Ensure no margin
    padding: 0,    // Ensure no padding
  },  
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, // Ensure the MapView takes the full screen within the SafeAreaView
  },
});

export default App;
