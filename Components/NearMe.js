import React, { useState } from 'react';
import MapView, { Marker, Heatmap, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function NearMe() {

  const [mapLat, setMapLat] = useState(35.923883);
  const [mapLong, setMapLong] = useState(74.310860);

  const locationData = [
    { latitude: 35.923883, longitude: 74.310860, marker: 'Shop no.1', description: 'the shop has wide variety of medicines related to diseases in plants.' },
    { latitude: 35.918807, longitude: 74.324080, marker: 'Shop no.2', description: 'this is shop 2' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locationData.map((data, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={data.marker}
            description={data.description}
            image={data.img}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});