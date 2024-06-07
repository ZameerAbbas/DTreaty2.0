// import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
// import React from 'react'
// import { useNavigation } from "@react-navigation/native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";

// const Footer = () => {
//     const navigation = useNavigation();

//     const navigateToHome = () => {
//       navigation.navigate("HomeScreen");
//     };
  
//     const navigateToClassificationScreen = () => {
//       navigation.navigate("ClassificationScreen");
//     };
//     const navigateToComingSoon = () => {
//       navigation.navigate("ComingSoon");
//     };
  
//     const navigateToWeatherScreen = ()=>{
//       navigation.navigate('Weather')
//     }
//     const navigateToFramAreaCal = ()=>{
//       navigation.navigate('FramAreaCal')
//     }
//     const navigateToShop = ()=>{
//       navigation.navigate('Shop')
//     }
//     const navigateToNearMe = ()=>{
//       navigation.navigate('NearMe')
//     }
//     const navigateToLaibaray = ()=>{
//       navigation.navigate('Laibaray')
//     }
//   return (
//    <View style={styles.footer}>
//    <View style={styles.footerCotent}>
//      <View>
//        <TouchableOpacity
//          style={styles.buttonBaar}
//          onPress={navigateToShop}
//        >
//         <View style={styles.footerBtn}>
//          <MaterialCommunityIcons
//            name="shopping-outline"
//            size={30}
//            color="#343434"
//          />
//          </View>
//        </TouchableOpacity>
//      </View>
//      <View>
//        <TouchableOpacity
//          style={styles.buttonBaar}
//          onPress={navigateToClassificationScreen}
//        >
//         <View style={styles.footerBtn}>
//          <Ionicons name="scan" size={30} color="#343434" />
//          </View>
//        </TouchableOpacity>
//      </View>
//      <View>
//        <TouchableOpacity
//          style={styles.buttonBaar}
//          onPress={navigateToHome}
//        >
//         <View style={styles.footerBtn}>
//          <AntDesign name="home" size={30} color="#343434" />
//          </View>
//        </TouchableOpacity>
//      </View>
//      <View>
//        <TouchableOpacity
//          style={styles.buttonBaar}
//          onPress={navigateToNearMe}
//        >
//         <View style={styles.footerBtn}>
//          <Entypo name="shop" size={30} color="#343434" />
//         </View>
//        </TouchableOpacity>
//      </View>
//      <View>
//        <TouchableOpacity
//          style={styles.buttonBaar}
//          onPress={navigateToComingSoon}
//        >
//         <View style={styles.footerBtn}>
//          <Feather name="more-horizontal" size={30} color="#343434" />
//          </View>
//        </TouchableOpacity>
       
//      </View>
//    </View>
//  </View>
//   )

// }

// export default Footer


// const styles = StyleSheet.create({

// footer: {
//     backgroundColor: "#D9D9D9",
//     height: 80,
//     bottom: 0,
//     paddingHorizontal: 20,
//     justifyContent:'center',
//     position: "absolute",
//     width: "100%",
//   },
//   footerCotent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   footerBtn:{
//     height:60, width:60, backgroundColor:'#4DB129', alignItems:'center', justifyContent:'center', borderRadius:30
//   },
//   buttonBaar: {},
// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Footer = () => {
    const navigation = useNavigation();
    const [animation] = useState(new Animated.Value(1)); // Animation state

    // Navigation functions
    const navigateToHome = () => {
        navigation.navigate("HomeScreen");
    };

    const navigateToClassificationScreen = () => {
        navigation.navigate("ClassificationScreen");
    };

    const navigateToComingSoon = () => {
        navigation.navigate("ComingSoon");
    };

    const navigateToShop = () => {
        navigation.navigate('Shop');
    };

    const navigateToNearMe = () => {
        navigation.navigate('NearMe');
    };

    // Button press animation
    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animation, { toValue: 0.9, duration: 50, useNativeDriver: false }),
            Animated.timing(animation, { toValue: 1, duration: 50, useNativeDriver: false }),
        ]).start();
    };

    return (
      <View style={styles.footer}>
      <View style={styles.footerContent}>
          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      startAnimation();
                      navigateToShop();
                  }}
              >
                  <FontAwesome5 name="shopping-bag" size={30} color="#4DB129" />
              </TouchableOpacity>
          </Animated.View>
  
          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      startAnimation();
                      navigateToClassificationScreen();
                  }}
              >
                  <MaterialCommunityIcons name="credit-card-scan" size={35} color="#4DB129" />
              </TouchableOpacity>
          </Animated.View>
  
          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      startAnimation();
                      navigateToHome();
                  }}
              >
                  <FontAwesome5 name="home" size={30} color="#4DB129" />
              </TouchableOpacity>
          </Animated.View>
  
          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      startAnimation();
                      navigateToNearMe();
                  }}
              >
                  <Entypo name="shop" size={30} color="#4DB129" />
              </TouchableOpacity>
          </Animated.View>
  
          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      startAnimation();
                      navigateToComingSoon();
                  }}
              >
                  <MaterialCommunityIcons name="more" size={30} color="#4DB129" />
              </TouchableOpacity>
          </Animated.View>
      </View>
  </View>
  
    );
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#4DB129",
        height: 80,
        bottom: 7,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignSelf:'center',
        position: "absolute",
        width: "95%",
        borderRadius:18,
    },
    footerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    button: {
        height: 55,
        width: 55,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
});


