// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Image, StyleSheet, BackHandler } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import treatmentData from "../assets/treatments.json";
// import { useNavigation } from '@react-navigation/native';

// const ResultScreen = ({ route }) => {
//   const { prediction, imageUri } = route.params;
//   const navigation = useNavigation();

//   const [treatment, setTreatment] = useState('');
//   const [symptoms, setSymptoms] = useState('');

//   useEffect(() => {  
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       navigation.navigate('HomeScreen');
//       return true;
//     });

//     extractTreatment(prediction);
    
//     return () => backHandler.remove();
//   }, []);

//   const extractTreatment = (predictedLabel) => {
//     const foundDisease = treatmentData.find(disease => disease.disease_name === predictedLabel);
//     if (foundDisease) {
//       setTreatment(foundDisease.treatment);
//       setSymptoms(foundDisease.symptoms);
//       storeData(predictedLabel, foundDisease.treatment, foundDisease.symptoms, imageUri);
//     } else {
//       setTreatment("Treatment not found");
//       setSymptoms("Symptoms not found");
//     }
//   };

//   const storeData = async (predictedLabel, treatment, symptoms, imageUri) => {
//     try {
//       const existingData = await AsyncStorage.getItem("my-key");
//       let newData = [];

//       if (existingData !== null) {
//         newData = JSON.parse(existingData);
//       }

//       newData.push({
//         name: predictedLabel,
//         treatment: treatment || "",
//         symptoms: symptoms || "",
//         image: imageUri,
//       });

//       await AsyncStorage.setItem("my-key", JSON.stringify(newData));
//     } catch (e) {
//       console.error("Error saving data:", e);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: imageUri }} style={styles.image} />
//       <Text style={styles.titleT}>{prediction}</Text>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
//         <Text style={styles.title}>Symptoms</Text>
//         <Text style={styles.resultText}>{symptoms}</Text>
//         <Text style={styles.title}>Treatment</Text>
//         <Text style={styles.resultText}>{treatment}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5DC',
//   },
//   scrollView: {
//     padding: 20,
//   },
//   titleT: {
//     fontSize: 28,
//     marginBottom: 15,
//     color: '#556B2F',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 15,
//     color: '#556B2F',
//     fontWeight: 'bold',
//   },
//   resultText: {
//     fontSize: 18,
//     color: '#6B8E23',
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     marginBottom: 20,
//   }
// });

// export default ResultScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, BackHandler, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import treatmentData from "../assets/treatments.json";
import { useNavigation } from '@react-navigation/native';
import translate from 'translate';

const ResultScreen = ({ route }) => {
  const { prediction, imageUri } = route.params;
  const navigation = useNavigation();

  const [treatment, setTreatment] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [translatedTreatment, setTranslatedTreatment] = useState('');
  const [translatedSymptoms, setTranslatedSymptoms] = useState('');
  const [isUrdu, setIsUrdu] = useState(true); // Track whether the text is in Urdu

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('HomeScreen');
      return true;
    });

    extractTreatment(prediction);
    
    return () => backHandler.remove();
  }, []);

  const extractTreatment = async (predictedLabel) => {
    const foundDisease = treatmentData.find(disease => disease.disease_name === predictedLabel);
    if (foundDisease) {
      setTreatment(foundDisease.treatment);
      setSymptoms(foundDisease.symptoms);
      storeData(predictedLabel, foundDisease.treatment, foundDisease.symptoms, imageUri);

      // Initial translation to Urdu
      try {
        const translatedTreat = await translate(treatment, { from: 'en', to: 'ur' });
        const translatedSymp = await translate(symptoms, { from: 'en', to: 'ur' });
        setTranslatedTreatment(translatedTreat);
        setTranslatedSymptoms(translatedSymp);
      } catch (error) {
        console.error('Error translating text:', error);
        setTranslatedTreatment('Translation error');
        setTranslatedSymptoms('Translation error');
      }
    } else {
      setTreatment("Treatment not found");
      setSymptoms("Symptoms not found");
      setTranslatedTreatment("ترجمہ دستیاب نہیں ہے");
      setTranslatedSymptoms("ترجمہ دستیاب نہیں ہے");
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

  const toggleLanguage = async () => {
    const from = isUrdu ? 'ur' : 'en';
    const to = isUrdu ? 'en' : 'ur';
    const textTreatment = isUrdu ? translatedTreatment : treatment;
    const textSymptoms = isUrdu ? translatedSymptoms : symptoms;
  
    try {
      const resultTreat = await translate(textTreatment, { from, to });
      const resultSymp = await translate(textSymptoms, { from, to });
      // console.log('Translated Treatment:', resultTreat);
      // console.log('Translated Symptoms:', resultSymp);
      setTranslatedTreatment(resultTreat);
      setTranslatedSymptoms(resultSymp);
      setIsUrdu(!isUrdu); // Toggle the language state
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedTreatment('Translation error');
      setTranslatedSymptoms('Translation error');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.titleT}>{prediction}</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Symptoms</Text>
        <Text style={styles.resultText}>{translatedSymptoms}</Text>
        <Text style={styles.title}>Treatment</Text>
        <Text style={styles.resultText}>{translatedTreatment}</Text>
      </ScrollView>
      <Button title="Toggle Language" onPress={toggleLanguage} />
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
  },
});

export default ResultScreen;
