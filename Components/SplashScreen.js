import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";

const SplashScreen = ({ navigation }) => {
      useEffect(() => {
      
        setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 5000);
      }, [navigation]);
    const [fontsLoaded] = useFonts({
        "Merriweather-Bold": require("../assets/fonts/Merriweather-Bold.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        "RobotoMono-Medium": require("../assets/fonts/RobotoMono-Medium.ttf"),
        "OpenSans": require("../assets/fonts/OpenSans-Regular.ttf"),
    });

      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }

    return (

        <SafeAreaView style={styles.safearea}>
            <ImageBackground
                source={require('../assets/images/splashPic.jpg')}
                style={styles.backgroundImage}
            >
                <Text style={styles.headtext}>DTreaty</Text>
                <Text style={styles.text}>The Ultimate Farming Solution</Text>
                <View style={styles.bottomcontainer}>
                    <Text style={{fontSize:14, marginBottom:12, fontFamily:'OpenSans', textAlign:'center', paddingHorizontal:20}}>Empowering Farmers, Nurturing Crops: {'\n'}Dtreaty - Your Companion in Crop Health, Detecting Diseases, and Prescribing Vital Treatments for Bountiful Harvests.</Text>
                    <Text style={{fontSize:16, marginBottom:12, fontFamily:'RobotoMono-Medium', marginTop:12}}>A Product By</Text>
                    <Image source={require('../assets/images/logo.png')} style={{height:52, width: 60}}/>
                </View>
            </ImageBackground>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'left',
    },
    bottomcontainer: {
        height: 300,
        width: '100%',
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        bottom: -350,
        justifyContent:'center',
        alignItems:'center',
    },
    headtext: {
        marginHorizontal: 30,
        marginVertical: 20,
        fontSize: 55,
        fontFamily: "Montserrat-Bold",
        color: 'green'
    },
    text: {
        marginHorizontal: 30,
        fontFamily: "RobotoMono-Medium",
        fontSize: 25,

    }
});

export default SplashScreen;