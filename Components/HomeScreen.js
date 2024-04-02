import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
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
import Footer from "./Footer";

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

  const navigateToWeatherScreen = () => {
    navigation.navigate("Weather");
  };
  const navigateToFramAreaCal = () => {
    navigation.navigate("FramAreaCal");
  };
  const navigateToShop = () => {
    navigation.navigate("Shop");
  };
  const navigateToNearMe = () => {
    navigation.navigate("NearMe");
  };
  const navigateToLaibaray = () => {
    navigation.navigate("Laibaray");
  };
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [currentTime]);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Shop Now",
      subtitle: "Second ItemSecond ItemSecond Item",
      buttonTxt: "Shop now",
      img: require("../assets/images/Group12.png"),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Near ME",
      subtitle: "Second ItemSecond ItemSecond Item",
      buttonTxt: "Near Me",
      img: require("../assets/images/Group12.png"),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Doctor",
      subtitle: "Second ItemSecond ItemSecond Item",
      buttonTxt: "Doctor",
      img: require("../assets/images/Group12.png"),
    },
  ];
  const Item = ({ item }) => {
    // console.log("sssss", item.item?.title);
    return (
      <View style={styles.item}>
        <View className="w-[70%]">
          <Text style={styles.title}>{item.item?.title}</Text>
          <Text style={styles.subtilte}>{item.item?.subtitle}</Text>
          <TouchableOpacity
            style={styles.buttonSlider}
            onPress={navigateToClassificationScreen}
          >
            <Text style={styles.buttonTextslider}>{item.item?.buttonTxt}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderImg}>
          <Image className="w-full" source={item.item?.img}  resizeMode="contain"/>
        </View>
      </View>
    );
  };

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
        source={require("../assets/images/Bg-main.jpg")}
        style={styles.main}
      >
        <View style={styles.overlay}>
          {/* slider */}
          <View style={styles.MainSlider}>
            <FlatList
              data={DATA}
              horizontal
              renderItem={(item) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* Components */}
          <View style={styles.GridConatiner}>
            <View style={styles.MainNavicationGrid}>
              <TouchableOpacity style={styles.button} onPress={navigateToShop}>
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
                onPress={navigateToNearMe}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="shop" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Near Me</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToWeatherScreen}
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
                onPress={navigateToFramAreaCal}
              >
                <View style={styles.ButtonFlex}>
                  <AntDesign name="calculator" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Farm Area Calculator</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToLaibaray}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Laibaray</Text>
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
          {/* <Footer /> */}
          <Footer/>
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
    width: "100%",
    textAlign: "center",
    marginTop: 25,
  },
  item: {
    backgroundColor: "#E6E6E6",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 180,
    borderRadius: 10,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    // color:'#000'
    
  },
  subtilte: {
    fontSize: 12,
  },
  buttonSlider: {
    backgroundColor: "#4DB129",
    width: 90,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginVertical: 4,
  },
  buttonTextslider: {
    color: "black",
  },
  sliderImg: {
    width: 100,

    height: 100,
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
    marginTop: 15,
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
    height: "60%",
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
