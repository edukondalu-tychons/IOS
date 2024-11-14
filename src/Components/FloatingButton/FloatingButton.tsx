// import React from 'react';
// import {StyleSheet, TouchableOpacity,Text, View} from 'react-native';
// import {FloatingAction} from 'react-native-floating-action';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// type Action = {
//   text: string;
//   icon: JSX.Element;
//   name: 'STANDARD' | 'SATELLITE' | 'HYBRID' | 'TERRAIN';
//   position: number;
// };

// // Use a more specific type for MapViewOptions
// const MapViewOptions: Record<
//   'STANDARD' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
//   string
// > = {
//   STANDARD: 'standard',
//   SATELLITE: 'satellite',
//   HYBRID: 'hybrid',
//   TERRAIN: 'terrain',
// };

// // Define props type for FloatingButton
// type FloatingButtonProps = {
//   onSelected: (
//     name: 'STANDARD' | 'SATELLITE' | 'HYBRID' | 'TERRAIN' | 'SEARCH',
//   ) => void;
// };

// const FloatingButton: React.FC<FloatingButtonProps> = ({
//   onSelected,
// }) => {
//   const actions: any = [
//     // {
//     //   text: 'Search',
//     //   name: 'SEARCH',
//     //   position: 1,
//     //   icon: <Icon name="magnify" size={23} color="white" />,
//     // },
//     {
//       text: 'Standard',
//       icon: <Icon name="map-outline" size={20} color="white" />,
//       name: 'STANDARD',
//       position: 1,
//     },
//     {
//       text: 'Satellite',
//       icon: <Icon name="satellite-variant" size={20} color="white" />,
//       name: 'SATELLITE',
//       position: 2,
//     },
//     {
//       text: 'Hybrid',
//       icon: <Icon name="layers-outline" size={20} color="white" />,
//       name: 'HYBRID',
//       position: 3,
//     },
//     {
//       text: 'Terrain',
//       icon: <Icon name="terrain" size={20} color="white" />,
//       name: 'TERRAIN',
//       position: 4,
//     },
//   ];

//   return (
//     // <FloatingAction
//     //   actions={actions}
//     //   //color="#FF6F61"
//     //   //distanceToEdge={Width* 0.06} // Adjust distance from edges
//     //   dismissKeyboardOnPress
//     //   position='center' // Set position to "right"
//     //   animated={true} // Optional: add animation
//     //   onPressItem={(name: any) => {
//     //     onSelected(name as 'STANDARD' | 'SATELLITE' | 'HYBRID' | 'TERRAIN');
//     //   }}
//     // />
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         {/* <View style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
//           <Icon name="close" size={30} color="black" />
//         </View> */}
//         <TouchableOpacity style={styles.optionButton} onPress={() => onSelected('STANDARD')}>
//           <Icon name="map-outline" size={25} color="blue" />
//           <Text style={styles.optionText}>Standard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionButton} onPress={() => onSelected('SATELLITE')}>
//           <Icon name="satellite-variant" size={25} color="blue" />
//           <Text style={styles.optionText}>Satellite</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionButton} onPress={() => onSelected('TERRAIN')}>
//           <Icon name="terrain" size={25} color="blue" />
//           <Text style={styles.optionText}>Terrain</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionButton} onPress={() => onSelected('HYBRID')}>
//           <Icon name="layers-outline" size={25} color="blue" />
//           <Text style={styles.optionText}>Hybrid</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     // justifyContent:'flex-end',
//     // alignItems:'center'
//     position:'absolute',
//     zIndex:2,
//     top: 120,
//     right: 100,
//     elevation: 10
//     //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius:10,
//     padding: 10
//   },
//   optionButton: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     flexDirection:"row",
//     justifyContent:'flex-start',
//     //alignItems:'center',
//   },
//   optionText: {
//     fontSize: 18,
//     color:'#000000',
//     marginLeft:10
//   },
// });

// export default FloatingButton;
