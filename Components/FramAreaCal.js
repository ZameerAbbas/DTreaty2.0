
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import MapView, { Polygon } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';


// const FramAreaCal = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [area, setArea] = useState(null);
//   const [initialRegion, setInitialRegion] = useState(null);

//   useEffect(() => {
//     // Geolocation.getCurrentPosition(
//     //   position => {
//     //     const { latitude, longitude } = position.coords;
//     //     setInitialRegion({
//     //       latitude,
//     //       longitude,
//     //       latitudeDelta: 0.0922,
//     //       longitudeDelta: 0.0421,
//     //     });
//     //   },
//     //   error => {
//     //     console.error(error);
//     //   },
//     //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     // );
//   }, []);

//   const calculateArea = () => {
//     // Function to calculate the area using coordinates
//     // This function is not implemented, you can use any algorithm to calculate area
//     // For simplicity, you can use third-party libraries like geolib or turf.js
//     // Example: const farmArea = geolib.getAreaOfPolygon(coordinates);
//     // Once calculated, set the area in state
//   };
//   const onMapPress = (e) => {
//     const newCoordinates = e.nativeEvent.coordinate;
//     setCoordinates([...coordinates, newCoordinates]);
//   };


//   return (
//     <View style={{ flex: 1 }}>
//     {initialRegion && (
//       <MapView
//         style={{ flex: 1 }}
//         onPress={onMapPress}
//         initialRegion={initialRegion}
//       >
//         {coordinates.length > 2 && (
//           <Polygon
//             coordinates={coordinates}
//             fillColor="rgba(0, 200, 0, 0.5)"
//             strokeColor="rgba(0,0,0,0.5)"
//           />
//         )}
//       </MapView>
//     )}
//     <View style={{ padding: 10 }}>
//       <Button title="Calculate Area" onPress={calculateArea} />
//       {area && <Text style={{ marginTop: 10 }}>Farm Area: {area} sq units</Text>}
//     </View>
//   </View>

//   )
// }

// export default 



import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Circle, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Svg, { Circle as SvgCircle, Rect, Polygon as SvgPolygon, Path } from 'react-native-svg';

const FramAreaCal = () => {
  const [drawMode, setDrawMode] = React.useState(null); // State to manage drawing mode

  const handleDrawMode = (mode) => {
    setDrawMode(mode === drawMode ? null : mode); // Toggle draw mode
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 36.3167,
          longitude: 74.65,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Example markers */}
        <Marker coordinate={{ latitude: 36.3167, longitude: 74.65 }} title="Marker" />

        {/* Example circle */}
        <Circle
          center={{ latitude: 36.3167, longitude: 74.65 }}
          radius={1000}
          fillColor="rgba(255, 0, 0, 0.5)"
        />

        {/* Example polygon */}
        <Polygon
          coordinates={[
            { latitude: 36.3, longitude: 74.7 },
            { latitude: 36.4, longitude: 74.8 },
            { latitude: 36.35, longitude: 74.9 },
          ]}
          fillColor="rgba(0, 255, 0, 0.5)"
        />

        {/* Example polyline */}
        <Polyline
          coordinates={[
            { latitude: 36.35, longitude: 74.7 },
            { latitude: 36.35, longitude: 74.8 },
            { latitude: 36.4, longitude: 74.85 },
          ]}
          strokeWidth={2}
          strokeColor="blue"
        />
      </MapView>

      {/* Zoom controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Drawing controls */}
      <View style={styles.drawingControls}>
        <TouchableOpacity onPress={() => handleDrawMode('polyline')} style={styles.drawButton}>
          <Svg height="30" width="30">
            <SvgPolygon points="15,0 30,30 0,30" fill="none" stroke="black" strokeWidth="2" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDrawMode('polygon')} style={styles.drawButton}>
          <Svg height="30" width="30">
            <Rect x="0" y="0" width="30" height="30" stroke="black" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>
        {/* Add other draw buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 5,
  },
  controlText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawingControls: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 5,
  },
  drawButton: {
    marginVertical: 5,
  },
});

export default FramAreaCal;
