import { registerRootComponent } from "expo";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import ImageClassifier from "./Components/classify";
import ComingSoon from "./Components/ComingSoon"
import Weather from "./Components/Weather";
import FramAreaCal from "./Components/FramAreaCal"
import Laibaray from "./Components/Laibaray"
import Libraray from "./Components/Libraray"
import NearMe from "./Components/NearMe"
import OfflineClassifier from "./Components/Offline_Prediction";
import OfflineClassifierV2 from "./Components/OfflinePredV2";
import DiseaseDetailsScreen from "./Components/diseaseDetail";
import ResultScreen from "./Components/treatment";
import History from "./Components/history";
import DiseaseDetailsHistoryScreen from "./Components/DiseaseDetails";
import SplashScreen from "./Components/SplashScreen";
import Login from "./Components/login";
import Details from "./Components/Details";
import firebase from '@react-native-firebase/app';
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBiGyvXF97HHjL_gHgvdzQSxUAjY7pfyyQ",
    authDomain: "smartfields-b9be4.firebaseapp.com",
    projectId: "smartfields-b9be4",
    storageBucket: "smartfields-b9be4.appspot.com",
    messagingSenderId: "870292720630",
    appId: "1:870292720630:web:be3c49c3051af2570915d7"
  };

  const app = initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="Splash"  
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"  
          component={Login}
          options={{
            headerShown: true,
            title: 'Login',
            headerStyle: {
              backgroundColor: '#4DB129', // Background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
            },
          }}
        />
        <Stack.Screen
          name="Details"  
          component={Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"  
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OfflineScreen"
          component={OfflineClassifier}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OfflineScreenV2"
          component={OfflineClassifierV2}
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
          name="DiseaseDetailsMain"
          component={DiseaseDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{
            headerShown: true,
            title: 'Weather',
            headerStyle: {
              backgroundColor: '#4DB129', // Background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
            },
          }}
        />
        <Stack.Screen
          name="FramAreaCal"
          component={FramAreaCal}
          options={{
            headerShown: true,
            title: 'Farm Calculator',
            headerStyle: {
              backgroundColor: '#4DB129', // Background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
            },
          }}
        />
        <Stack.Screen
          name="Laibaray"
          component={Laibaray}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreatmentShop"
          component={Libraray}
          options={{
            headerShown: true,
            title: 'Disease List',
            headerStyle: {
              backgroundColor: '#4DB129', // Background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
            },
          }}
        />

        <Stack.Screen
          name="NearMe"
          component={NearMe}
          options={{
            headerShown: true,
            title: 'Find Your Medicine',
            headerStyle: {
              backgroundColor: '#4DB129', // Background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
            },
          }}
        />
        <Stack.Screen
          name="treatment"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryDeatils"
          component={DiseaseDetailsHistoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
