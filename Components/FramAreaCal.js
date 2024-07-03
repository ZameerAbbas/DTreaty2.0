import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as geolib from 'geolib';

const FramAreaCal = () => {
  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);

  const handleMapPress = (event) => {
    setPoints([...points, event.nativeEvent.coordinate]);
  };

  const calculateArea = () => {
    if (points.length < 3) {
      alert('At least 3 points are required to calculate an area');
      return;
    }
    const calculatedArea = geolib.getAreaOfPolygon(points);
    setArea(calculatedArea);
  };

  const clearArea = () => {
    setPoints([]);
    setArea(0);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handleMapPress}
      >
        {points.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
        {points.length > 2 && <Polygon coordinates={points} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Calculate Area" onPress={calculateArea} />
        <Button title="Clear" onPress={clearArea} />
        {area > 0 && <Text>Area: {area} m²</Text>}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FramAreaCal;
