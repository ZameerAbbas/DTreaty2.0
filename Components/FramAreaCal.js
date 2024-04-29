
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


const FramAreaCal = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [area, setArea] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const calculateArea = () => {
    // Function to calculate the area using coordinates
    // This function is not implemented, you can use any algorithm to calculate area
    // For simplicity, you can use third-party libraries like geolib or turf.js
    // Example: const farmArea = geolib.getAreaOfPolygon(coordinates);
    // Once calculated, set the area in state
  };
  const onMapPress = (e) => {
    const newCoordinates = e.nativeEvent.coordinate;
    setCoordinates([...coordinates, newCoordinates]);
  };


  return (
    <View style={{ flex: 1 }}>
    {initialRegion && (
      <MapView
        style={{ flex: 1 }}
        onPress={onMapPress}
        initialRegion={initialRegion}
      >
        {coordinates.length > 2 && (
          <Polygon
            coordinates={coordinates}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
          />
        )}
      </MapView>
    )}
    <View style={{ padding: 10 }}>
      <Button title="Calculate Area" onPress={calculateArea} />
      {area && <Text style={{ marginTop: 10 }}>Farm Area: {area} sq units</Text>}
    </View>
  </View>

  )
}

export default FramAreaCal