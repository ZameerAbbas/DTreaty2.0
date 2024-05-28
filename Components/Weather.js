import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("Gilgit");
  const [cityCoordinates, setCityCoordinates] = useState({ latitude: 35.92, longitude: 74.30 });
  const [displayedCity, setDisplayedCity] = useState("Gilgit");

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        setLoading(true);
        const apiKey = "432a8658a6991c2c948f1125de99c13d"; // Replace with your OpenWeather API key
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setLoading(false);
      }
    };

    fetchWeatherData(cityCoordinates.latitude, cityCoordinates.longitude);
  }, [cityCoordinates]);

  const handleCheckButtonPress = async () => {
    if (searchText.trim() === "") {
      console.error('Search field cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`);
      const data = await response.json();
      if (data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        setCityCoordinates({ latitude, longitude });
        setDisplayedCity(searchText);
        setSearchText('');
      } else {
        console.error('No results found for the provided city name.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      setLoading(false);
    }
  };

  const DayForecast = ({ day, temperature, description }) => {
    const getImageSource = (description) => {
      switch (description) {
        case "Clear":
          return require("../assets/images/sun.png");
        case "Snow":
          return require("../assets/images/cloud.png");
        case "Rain":
          return require("../assets/images/heavy-rain.png");
        case "Clouds":
          return require("../assets/images/snow.png");
        case "Thunderstorm":
          return require("../assets/images/raincloud.png");
        default:
          return require("../assets/images/sun.png");
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

  const forecastDays = weatherData ? weatherData.daily.slice(1, 6).map((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = `${Math.round(day.temp.day)}° - ${Math.round(day.temp.night)}°`;
    const description = day.weather[0].main;

    return { day: dayName, temperature: temp, description };
  }) : [];

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
            onChangeText={setSearchText}
            value={searchText}
          />
          <TouchableOpacity onPress={handleCheckButtonPress}>
            <Icon name="check" size={20} color="#aaa" style={styles.OkIcon} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : weatherData ? (
          <View style={styles.currentweather}>
            <Text style={styles.weathertext}>{displayedCity}</Text>
            <Image
              style={styles.weatherimage}
              source={require("../assets/images/sun.png")}
            />
            <Text style={styles.weathertext}>
              {Math.ceil(weatherData.current.temp)}°C
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>5-day forecast</Text>
        {forecastDays.map((data, index) => (
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
    backgroundColor: "#fff",
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
    backgroundColor: "#f0f0f0",
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
