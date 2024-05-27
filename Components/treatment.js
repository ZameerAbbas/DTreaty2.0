import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import treatmentData from "../assets/treatments.json";
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const { prediction, imageUri } = route.params;
  const navigation = useNavigation();

  const [treatment, setTreatment] = useState('');
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('HomeScreen');
      return true;
    });

    extractTreatment(prediction);
    
    return () => backHandler.remove();
  }, []);

  const extractTreatment = (predictedLabel) => {
    const foundDisease = treatmentData.find(disease => disease.disease_name === predictedLabel);
    if (foundDisease) {
      setTreatment(foundDisease.treatment);
      setSymptoms(foundDisease.symptoms);
      storeData(predictedLabel, foundDisease.treatment, foundDisease.symptoms, imageUri);
    } else {
      setTreatment("Treatment not found");
      setSymptoms("Symptoms not found");
    }
  };

  const storeData = async (predictedLabel, treatment, symptoms, imageUri) => {
    try {
      const existingData = await AsyncStorage.getItem("my-key");
      let newData = [];

      if (existingData !== null) {
        newData = JSON.parse(existingData);
      }

      newData.push({
        name: predictedLabel,
        treatment: treatment || "",
        symptoms: symptoms || "",
        image: imageUri,
      });

      await AsyncStorage.setItem("my-key", JSON.stringify(newData));
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.titleT}>{prediction}</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
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
    backgroundColor: '#F5F5DC',
  },
  scrollView: {
    padding: 20,
  },
  titleT: {
    fontSize: 28,
    marginBottom: 15,
    color: '#556B2F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    color: '#556B2F',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    color: '#6B8E23',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  }
});

export default ResultScreen;
