import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Footer = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
      navigation.navigate("HomeScreen");
    };
  
    const navigateToClassificationScreen = () => {
      navigation.navigate("ClassificationScreen");
    };
    const navigateToComingSoon = () => {
      navigation.navigate("ComingSoon");
    };
  
    const navigateToWeatherScreen = ()=>{
      navigation.navigate('Weather')
    }
    const navigateToFramAreaCal = ()=>{
      navigation.navigate('FramAreaCal')
    }
    const navigateToShop = ()=>{
      navigation.navigate('Shop')
    }
    const navigateToNearMe = ()=>{
      navigation.navigate('NearMe')
    }
    const navigateToLaibaray = ()=>{
      navigation.navigate('Laibaray')
    }
  return (
   <View style={styles.footer}>
   <View style={styles.footerCotent}>
     <View>
       <TouchableOpacity
         style={styles.buttonBaar}
         onPress={navigateToShop}
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
         onPress={navigateToClassificationScreen}
       >
         <Ionicons name="scan" size={24} color="#343434" />
       </TouchableOpacity>
     </View>
     <View>
       <TouchableOpacity
         style={styles.buttonBaar}
         onPress={navigateToHome}
       >
         <AntDesign name="home" size={24} color="#343434" />
       </TouchableOpacity>
     </View>
     <View>
       <TouchableOpacity
         style={styles.buttonBaar}
         onPress={navigateToNearMe}
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
  )

}

export default Footer


const styles = StyleSheet.create({

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