import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./Footer";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const apiKey = "432a8658a6991c2c948f1125de99c13d";
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=35.92&lon=74.30&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setWeatherData(data);
        // console.log(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  const handleSearchChange = (text) => {
    setSearchText(text);
    console.log(searchText);
  };
  const DayForecast = ({ day, temperature, description }) => {
    const getImageSource = (description) => {
      switch (description) {
        case "sunny":
          return require("../assets/images/sun.png");
        case "snowy":
          return require("../assets/images/cloud.png");
        case "rainy":
          return require("../assets/images/heavy-rain.png");
        case "cloudy":
          return require("../assets/images/snow.png");
        case "heavy-rain":
          return require("../assets/images/raincloud.png");
        // Add more cases for other descriptions if needed
        default:
          return null;
      }
    };
    return (
      <View style={styles.dayForecastContainer}>
        <Image
          source={getImageSource(description)}
          style={styles.forecastimage}
        />
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.temperature}>{temperature}</Text>
      </View>
    );
  };
  const forecastData = [
    { day: "Mon", temperature: "23°-07°", description: "sunny" },
    { day: "Tue", temperature: "23°-07°", description: "snowy" },
    { day: "Wed", temperature: "-01°-01°", description: "cloudy" },
    { day: "Thu", temperature: "11°-07°", description: "rainy" },
    { day: "Fri", temperature: "15°-13°", description: "heavy-rain" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.currentweather}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#aaa"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for a City"
            onChangeText={handleSearchChange}
            value={searchText}
          />
          <TouchableOpacity onPress={handleSearchChange}>
            <Icon name="check" size={20} color="#aaa" style={styles.OkIcon} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <View style={styles.currentweather}>
            <Text style={styles.weathertext}>Gilgit, Pakistan</Text>
            <Image
              style={styles.weatherimage}
              source={require("../assets/images/sun.png")}
            />
            <Text style={styles.weathertext}>
              {Math.ceil(weatherData.current.temp - 273.15)}°C
            </Text>
          </View>
        )}
      </View>
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
    backgroundColor: "#fffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cce7ed",
    borderRadius: 18,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  OkIcon: {
    right: 3,
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
  weathertext: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  currentWeatherText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentweather: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dayForecastContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forecastimage: {
    height: 40,
    width: 40,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: "#666666",
  },
});

export default WeatherForecast;
