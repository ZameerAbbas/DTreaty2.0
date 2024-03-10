import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as tf from "@tensorflow/tfjs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import CameraScreen from "./Components/CameraScreen";
import ImageClassifier from "./Components/classify";
import ComingSoon from "./Components/ComingSoon";
import Weather from "./Components/Weather";
import FramAreaCal from "./Components/FramAreaCal";
import Laibaray from "./Components/Laibaray";
import Shop from "./Components/Shop";
import NearMe from "./Components/NearMe";
import More from "./Components/More";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Shop" component={Shop} />
    //   <Tab.Screen name="ClassificationScreen" component={ImageClassifier} />

    //   <Tab.Screen
    //     name="HomeScreen"
    //     component={HomeScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Tab.Screen name="NearMe" component={NearMe} />

    //   <Tab.Screen name="More" component={More} />
    // </Tab.Navigator>
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "HomeScreen") {
          iconName = "home"; 
        } else if (route.name === "ClassificationScreen") {
          iconName = "camera"; 
        } else if (route.name === "Shop") {
          iconName = "storefront"; 
        } else if (route.name === "NearMe") {
          iconName = "location"; 
        } else if (route.name === "More") {
          iconName = "ellipsis-horizontal"; 
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null, // Hide the tab bar label
    })}
  >
    <Tab.Screen name="Shop" component={Shop} />
    <Tab.Screen name="ClassificationScreen" component={ImageClassifier} />
    <Tab.Screen name="HomeScreen" component={HomeScreen} 
      options={{ headerShown: false }}
     />
    <Tab.Screen name="NearMe" component={NearMe} />
    <Tab.Screen name="More" component={More} />
  </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyTabs">
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClassificationScreen"
          component={ImageClassifier}
          options={"Crop Doctor"}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoon}
          options={"ComingSoon"}
        />

        <Stack.Screen
          name="FramAreaCal"
          component={FramAreaCal}
          options={"FramAreaCal"}
        />
        <Stack.Screen
          name="Laibaray"
          component={Laibaray}
          options={"Laibaray"}
        />
        <Stack.Screen name="Shop" component={Shop} options={"Shop"} />
        <Stack.Screen name="NearMe" component={NearMe} options={"NearMe"} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
