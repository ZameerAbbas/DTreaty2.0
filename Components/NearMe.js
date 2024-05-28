// src/screens/WeatherScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NearMe = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            q: 'Gilgit', // Change to your desired city
            cnt: 10,
            units: 'metric',
            appid: '432a8658a6991c2c948f1125de99c13d' // Replace with your OpenWeather API key
          }
        });
        setForecast(response.data.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Weather Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.date}>{new Date(item.dt * 1000).toDateString()}</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
            <Text style={styles.temp}>Temp: {item.main.temp}°C</Text>
            <Text style={styles.humidity}>Humidity: {item.main.humidity}%</Text>
          </View>
        )}
      />
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
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: '#555'
  },
  temp: {
    fontSize: 16,
    color: '#000'
  },
  humidity: {
    fontSize: 16,
    color: '#000'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center'
  }
});

export default NearMe;
