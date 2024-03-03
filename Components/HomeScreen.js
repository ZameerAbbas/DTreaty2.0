import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToCameraScreen = () => {
    navigation.navigate("CameraScreen");
  };

  const navigateToClassificationScreen = () => {
    navigation.navigate("ClassificationScreen");
  };
  const navigateToComingSoon = () => {
    navigation.navigate("ComingSoon");
  };

  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [currentTime]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.HeaderContent}>
          <View style={styles.UserProfile}>
            <View>
              <FontAwesome name="user-circle-o" size={25} color="#343434" />
            </View>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
            </View>
          </View>
          <View style={styles.cartbox}>
            <View style={styles.cartnotif}>
              <Ionicons name="notifications" size={27} color="#343434" />
            </View>
            <View>
              <MaterialIcons name="shopping-cart" size={27} color="#343434" />
            </View>
          </View>
        </View>
      </View>

      <ImageBackground
        source={require("../assets/images/Bg-main.jpg")} // Replace with the actual path to your image
        style={styles.main}
      >
        <View style={styles.overlay}>
          {/* slider */}
          <View style={styles.MainSlider}>
            <Text style={styles.MainSliderText}>This is the main slider</Text>
          </View>
          {/* Components */}
          <View style={styles.GridConatiner}>
            <View style={styles.MainNavicationGrid}>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToCameraScreen}
              >
                <View style={styles.ButtonFlex}>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.buttonText}>Shop</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToClassificationScreen}
              >
                <View style={styles.ButtonFlex}>
                  <Ionicons name="scan" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Crop Doctor</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToClassificationScreen}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="shop" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Near Me</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                // onPress={navigateToCameraScreen}
              >
                <View style={styles.ButtonFlex}>
                  <MaterialCommunityIcons
                    name="weather-hail"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.buttonText}>Weather</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                // onPress={navigateToCameraScreen}
              >
                <View style={styles.ButtonFlex}>
                  <AntDesign name="calculator" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Farm Area Calculator</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                // onPress={navigateToComingSoon}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                // onPress={navigateToComingSoon}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToComingSoon}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToComingSoon}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* ====Footer=== */}
          <View style={styles.footer}>
            <View style={styles.footerCotent}>
              <View>
                <TouchableOpacity
                  style={styles.buttonBaar}
                  onPress={navigateToComingSoon}
                >
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={24}
                    color="#343434"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonBaar}
                  onPress={navigateToComingSoon}
                >
                  <Ionicons name="scan" size={24} color="#343434" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonBaar}
                  onPress={navigateToComingSoon}
                >
                  <AntDesign name="home" size={24} color="#343434" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonBaar}
                  onPress={navigateToComingSoon}
                >
                  <Entypo name="shop" size={24} color="#343434" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonBaar}
                  onPress={navigateToComingSoon}
                >
                  <Feather name="more-horizontal" size={24} color="#343434" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#D9D9D9",
    padding: 20,
    paddingTop: 50,
    height: 95,
  },
  HeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  UserProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontWeight: "bold",
    paddingHorizontal: 7,
  },
  cartnotif: {
    paddingHorizontal: 15,
  },
  cartbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MainSlider: {
    color: "#ffff",
    width: "100%",
    height: 300,
    borderColor: "red",
    borderWidth: 3,
    textAlign: "center",
  },
  MainSliderText: {
    color: "#ffff",
  },
  main: {
    flex: 1,
    resizeMode: "contain",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  GridConatiner: {
    padding: 20,
    marginTop:15
  },
  MainNavicationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4DB129",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3,
    marginTop: 10,
    width: "30%",
    height: "50%",
    textAlign: "center",
  },
  ButtonFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#D9D9D9",
    height: 65,
    bottom: 0,
    padding: 20,
    position: "absolute",
    width: "100%",
  },
  footerCotent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonBaar: {},
});

export default HomeScreen;
