// import React, { useState } from 'react';
// import { StyleSheet, View, Button, Text } from 'react-native';
// import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as geolib from 'geolib';

// const FramAreaCal = () => {
//   const [points, setPoints] = useState([]);
//   const [area, setArea] = useState(0);

//   const handleMapPress = (event) => {
//     setPoints([...points, event.nativeEvent.coordinate]);
//   };

//   const calculateArea = () => {
//     if (points.length < 3) {
//       alert('At least 3 points are required to calculate an area');
//       return;
//     }
//     const calculatedArea = geolib.getAreaOfPolygon(points);
//     setArea(calculatedArea);
//   };

//   const clearArea = () => {
//     setPoints([]);
//     setArea(0);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         onPress={handleMapPress}
//       >
//         {points.map((point, index) => (
//           <Marker key={index} coordinate={point} />
//         ))}
//         {points.length > 2 && <Polygon coordinates={points} />}
//       </MapView>
//       <View style={styles.buttonContainer}>
//         <Button title="Calculate Area" onPress={calculateArea} />
//         <Button title="Clear" onPress={clearArea} />
//         {area > 0 && <Text>Area: {area} m²</Text>}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//     left: '10%',
//     right: '10%',
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default FramAreaCal;
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import * as geolib from "geolib";

const FramAreaCal = () => {
  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);
  const [initialRegion, setInitialRegion] = useState(null);
  const [mapType, setMapType] = useState("hybrid"); // Initialize with 'hybrid'

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert("Location permission denied");
          setInitialRegion({
            latitude: 30.3753,
            longitude: 69.3451,
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          setInitialRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => {
          console.log(error);
          alert("Error getting location, defaulting to Pakistan");
          setInitialRegion({
            latitude: 30.3753,
            longitude: 69.3451,
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  const handleMapPress = (event) => {
    setPoints([...points, event.nativeEvent.coordinate]);
  };

  const calculateArea = () => {
    if (points.length < 3) {
      alert("At least 3 points are required to calculate an area");
      return;
    }
    const calculatedArea = geolib.getAreaOfPolygon(points);
    setArea(calculatedArea);
  };

  const clearArea = () => {
    setPoints([]);
    setArea(0);
  };

  const undoLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };

  // if (!initialRegion) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={initialRegion}
        mapType={mapType}
      >
        {points.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
        {points.length > 2 && <Polygon coordinates={points} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Calculate Area"
          onPress={calculateArea}
          style={styles.btns}
        />
        <Button title="Clear" onPress={clearArea} style={styles.btns} />
        <Button
          title="Undo Last Point"
          onPress={undoLastPoint}
          style={styles.btns}
        />
        {area > 0 && <Text>Area: {area} m²</Text>}
      </View>
      <View style={styles.mapTypeButtonContainer}>
        <Button
          title="Standard"
          onPress={() => setMapType("standard")}
          style={styles.btns}
        />
        <Button
          title="Terrain"
          onPress={() => setMapType("terrain")}
          style={styles.btns}
        />
        <Button
          title="Satellite"
          onPress={() => setMapType("satellite")}
          style={styles.btns}
        />
        <Button
          title="Hybrid"
          onPress={() => setMapType("hybrid")}
          
          classNAme="bg-red-900"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "column", // Changed to column to accommodate more buttons
    justifyContent: "space-between",
  },
  mapTypeButtonContainer: {
    position: "absolute",
    bottom: 50,
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btns: {
    backgroundColor: "#4DB129",
    margin: 10,
  },
});

export default FramAreaCal;
