<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherForecast = () => {

  const DayForecast = ({ day, temperature, description }) => {

    const getImageSource = (description) => {
      switch (description) {
        case 'sunny':
          return require('../assets/images/sun.png');
        case 'snowy':
          return require('../assets/images/cloud.png');
        case 'rainy':
          return require('../assets/images/heavy-rain.png');
        case 'cloudy':
          return require('../assets/images/snow.png');
        case 'heavy-rain':
          return require('../assets/images/raincloud.png');
        // Add more cases for other descriptions if needed
        default:
          return null;
      }
    };
    return (
      <View style={styles.dayForecastContainer}>
        <Image source={getImageSource(description)} style={styles.forecastimage}/>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.temperature}>{temperature}</Text>
        {/* <Text style={styles.description}>{description}</Text> */}
      </View>
    );
  };
  const forecastData = [
    { day: 'Mon', temperature: '25°-19°', description: 'sunny' },
    { day: 'Tue', temperature: '23°-07°', description: 'snowy' },
    { day: 'Wed', temperature: '-01°-01°', description: 'cloudy' },
    { day: 'Thu', temperature: '11°-07°', description: 'rainy' },
    { day: 'Fri', temperature: '15°-13°', description: 'heavy-rain' },
  ];

  return (
    <View style={styles.container}>
      {/* Current Weather */}
      <Text style={styles.currentWeatherText}>Weather</Text>
      <View style={styles.currentweather}>
      <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search for a City"
      />
    </View>
        <Text style={styles.weathertext}>Gilgit, Pakistan</Text>
        <Image style={styles.weatherimage} source={require('../assets/images/sun.png')} />
        <Text style={styles.weathertext}>25°C</Text>
      </View>


      {/* Next Five Days Forecast */}
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>5-day forecast</Text>
        {forecastData.map((data, index) => (
          <DayForecast
            key={index}
            day={data.day}
            temperature={data.temperature}
            description={data.description}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cce7ed',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  weatherimage: {
    height: 70,
    width: 70,
    marginBottom: 10,
    marginTop: 15,
  },
  // input: {
  //   width: '100%',
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: '#264653', // Dark green
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   marginBottom: 20,
  // },
  weathertext: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  currentWeatherText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentweather: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayForecastContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  forecastimage:{
    height:40,
    width:40
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
  },
});

export default WeatherForecast;
=======
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const apiKey = "977d38fe527d26a1f065a950f0e843c0";
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setWeatherData(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading weather data...</Text>
      ) : (
        <View>
          <Text style={styles.weatherText}>
            Temperature: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            Description: {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
>>>>>>> 05fa95313f607d5ea5303e9491f30df44c5a373f
