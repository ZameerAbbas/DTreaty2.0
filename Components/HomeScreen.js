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
import { useFonts } from "expo-font";
import YoutubeSlider from "./youtube";
import Item from "./commonDisease";



const HomeScreen = () => {
  const navigation = useNavigation();

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
    navigation.navigate("OfflineScreen");
  };
  const navigateToNearMe = () => {
    navigation.navigate("NearMe");
  };
  const navigateToLaibaray = () => {
    navigation.navigate("Laibaray");
  };
  const navigatetoYoutube = () => {
    navigation.navigate("VideosList");
  };


  const [greeting, setGreeting] = useState("");
  const [fontsLoaded, fontError] = useFonts({
    "Merriweather-Bold": require("../assets/fonts/Merriweather-Bold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    // fggdm
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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const DATA = [
    {
      id: "5",
      title: "Powdery Mildew",
      subtitle: "Powdery mildew appears as white powdery patches on leaves, stems, and flowers.",
      buttonTxt: "Details",
      img: require("../assets/images/powderyMildew.jpg"),
      details: "Powdery mildew is a fungal disease caused by various species of fungi in the order Erysiphales. It thrives in warm, humid conditions and can affect a wide range of plants including roses, cucumbers, squash, and lilacs. The white powdery patches typically develop on the upper surface of leaves, although they can also occur on stems and flowers. As the disease progresses, the affected leaves may become distorted and eventually die. Control measures include planting resistant varieties, ensuring good air circulation around plants, and applying fungicides if necessary."
    },
    {
      id: "2",
      title: "Leaf Spot",
      subtitle: "Leaf spot manifests as dark or discolored spots on leaves, often with a defined border.",
      buttonTxt: "Details",
      img: require("../assets/images/leaf-spot.jpg"),
      details: "Leaf spot is a common fungal disease caused by various species of fungi, including Alternaria, Septoria, and Cercospora. It often occurs during periods of high humidity and can affect a wide range of plants, including vegetables, ornamentals, and trees. Leaf spot typically appears as dark or discolored spots on leaves, which may have a defined border. In severe cases, the spots may coalesce, causing extensive leaf damage and defoliation. Control measures include removing and destroying infected plant material, practicing good garden hygiene, and applying fungicides as needed."
    },
    {
      id: "3",
      title: "Rust",
      subtitle: "Rust appears as orange, yellow, or brown powdery or pustular growths on leaves and stems.",
      buttonTxt: "Details",
      img: require("../assets/images/rust.jpg"),
      details: "Rust is a fungal disease caused by various species of fungi in the order Pucciniales. It affects a wide range of plants, including ornamentals, vegetables, and grains. Rust typically appears as orange, yellow, or brown powdery or pustular growths on leaves and stems. These growths contain masses of spores that can spread the disease to nearby plants. Rust infections can weaken plants, reduce yields, and affect the aesthetic appeal of ornamental plants. Control measures include planting resistant varieties, removing and destroying infected plant material, and applying fungicides if necessary."
    },
    {
      id: "4",
      title: "Anthracnose",
      subtitle: "Anthracnose causes dark, sunken lesions on leaves, stems, and fruits.",
      buttonTxt: "Details",
      img: require("../assets/images/anthredc.jpg"),
      details: "Anthracnose is a fungal disease caused by various species of fungi in the genus Colletotrichum. It affects a wide range of plants, including trees, shrubs, and vegetables. Anthracnose typically appears as dark, sunken lesions on leaves, stems, and fruits. These lesions may have a water-soaked appearance in wet conditions and can eventually lead to tissue death. Anthracnose infections can weaken plants, reduce yields, and affect the quality of fruits and vegetables. Control measures include practicing good garden hygiene, removing and destroying infected plant material, and applying fungicides as needed."
    },
    {
      id: "1",
      title: "Root Rot",
      subtitle: "Root rot results in rotting roots, often accompanied by wilting, yellowing, or stunted growth above ground.",
      buttonTxt: "Details",
      img: require("../assets/images/rootRot.jpg"),
      details: "Root rot is a common problem caused by various pathogens, including fungi, bacteria, and water molds. It affects a wide range of plants, including trees, shrubs, and vegetables. Root rot typically occurs in waterlogged or poorly drained soil, where oxygen levels are low and pathogens thrive. Symptoms of root rot include rotting roots, often with a foul odor, as well as wilting, yellowing, or stunted growth above ground. Control measures include improving soil drainage, avoiding overwatering, and planting resistant varieties. In severe cases, affected plants may need to be removed and replaced."
    }
  ];

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
              <TouchableOpacity onPress={navigatetoYoutube}>
                <Ionicons name="notifications" size={27} color="#343434" />
              </TouchableOpacity>
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
          <Text style={[styles.headingtil, {marginTop:15}]}>Be aware of these</Text>
          <View style={styles.MainSlider}>
            <FlatList
              data={DATA}
              horizontal
              renderItem={(item) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* Components */}


          <Text style={[styles.headingtil, {marginTop: 10}]}>Our Services</Text>


          <View style={styles.GridConatiner}>
            <View style={styles.MainNavicationGrid}>
              <TouchableOpacity style={styles.button} onPress={navigateToShop}>
                <View style={styles.ButtonFlex}>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={35}
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
                  <Ionicons name="scan" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Crop Doctor</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToNearMe}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="shop" size={35} color="#FFFFFF" />
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
                    size={35}
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
                  <AntDesign name="calculator" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Farm Area Calculator</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToLaibaray}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Laibaray</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToLaibaray}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Treatment</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToComingSoon}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToNearMe}
              >
                <View style={styles.ButtonFlex}>
                  <Entypo name="stopwatch" size={35} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Coming Soon</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.youtubeContainer}>

            <YoutubeSlider/>
            <YoutubeSlider/>
          </View> */}

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
  headingtil:{
    color:'white',
    fontSize:25,
    marginLeft:13,
    opacity:0.8,
    fontFamily: "Merriweather-Bold",
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
    marginTop: 20,
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
    padding: 15,
    },
  MainNavicationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4DB129",
    paddingVertical: 24,
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
    fontSize: 13,
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
  youtubeContainer:{
    width:'100%',
    flexDirection: 'row',
    marginLeft:13
  }

});

export default HomeScreen;
