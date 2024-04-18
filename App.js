import { registerRootComponent } from "expo";
import * as React from "react";
import { AppRegistry} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoon}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FramAreaCal"
          component={FramAreaCal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Laibaray"
          component={Laibaray}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Shop"
          component={Shop}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NearMe"
          component={NearMe}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);