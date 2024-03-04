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
