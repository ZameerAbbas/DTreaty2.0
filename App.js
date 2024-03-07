import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as tf from "@tensorflow/tfjs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import CameraScreen from "./Components/CameraScreen";
import ImageClassifier from "./Components/classify";
import ComingSoon from "./Components/ComingSoon"
import Weather from "./Components/Weather";
import FramAreaCal from "./Components/FramAreaCal"
import Laibaray from "./Components/Laibaray"
import Shop from "./Components/Shop"
import NearMe from "./Components/NearMe"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
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
          name="Weather"
          component={Weather}
          options={"Weather app"}
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
        <Stack.Screen
          name="Shop"
          component={Shop}
          options={"Shop"}
        />
        <Stack.Screen
          name="NearMe"
          component={NearMe}
          options={"NearMe"}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
