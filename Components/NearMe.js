// src/screens/WeatherScreen.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const NearMe = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Weather Forecast</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  }
});

export default NearMe;
