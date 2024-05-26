import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, BackHandler } from 'react-native';
import treatmentData from "../assets/treatments.json";
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const { prediction, imageUri } = route.params;

  const navigation = useNavigation();

    const [treatment, setTreatment] = useState('');
    const [symptoms, setSymptoms] = useState('');

  useEffect(() => {  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('HomeScreen'); // Navigate to the home screen when back button is pressed
        return true; // Return true to prevent default back button behavior
      });
    extractTreatment(prediction);
    return () => backHandler.remove(); // Cleanup event listener on unmount
  }, []);


  const extractTreatment = (predictedLabel) => {
    const foundDisease = treatmentData.find(
      (disease) => disease.disease_name === predictedLabel
    );
    const foundsymptoms = treatmentData.find(
      (disease) => disease.disease_name === predictedLabel
    );
    if (foundDisease) {
      setTreatment(foundDisease.treatment);
      setSymptoms(foundsymptoms.symptoms);
    //   storeData(predictedLabel, foundDisease.treatment, foundsymptoms.symptoms, imageUri); // Use the image URI
    } else {
      setTreatment("Treatment not found");
    }
  };



  return (
    <View style={styles.container}>
        <Image source={{uri:imageUri}} style={styles.image} />
        <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Prediction Result</Text>
      <Text style={styles.resultText}>{prediction}</Text>
      <Text style={styles.title}>Symptoms</Text>
      <Text style={styles.resultText}>{symptoms}</Text>
      <Text style={styles.title}>Treatment</Text>
      <Text style={styles.resultText}>{treatment}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    color: 'green',
  },
  image: {
    width: '100%',
    height: 300,
  }
});

export default ResultScreen;
