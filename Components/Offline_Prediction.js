import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from 'expo-image-picker';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js';

export default function OfflineClassifier() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [label, setLabel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pickedImage, setPickedImage] = useState('');
  const class_names = [
    "ceviche",
    "cheese_plate",
    "cheesecake",
    "chicken_curry",
    "chicken_quesadilla",
    "chicken_wings",
    "chocolate_cake",
    "chocolate_mousse",
    "churros",
    "clam_chowder"
  ];

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        classifyImages(result.assets[0].uri);
      } else {
        console.log("Image picker was cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  useEffect(() => {
    async function initializeModel() {
      try {
        await tf.ready();
        const modelJSON = require("../assets/models/model.json");
        const modelWeights = require("../assets/models/group1-shard1of1.bin");
        const model = await tf.loadGraphModel(
          bundleResourceIO(modelJSON, modelWeights)
        );
        model.predict(tf.zeros([1, 224, 224, 3]));
        setModel(model);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Error While Loading Doctor.', [
          {
            text: 'Cancel',
            onPress: () => {navigateToDiagnoseScreen},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
        ]);
      }
    }
    initializeModel();
  }, []);

  const predictWithModel = async (imageTensor) => {
    try {
      const predictions = await model.predict(imageTensor).data();
      setPredictions(predictions);
      const predicted_class = tf.argMax(predictions).dataSync()[0];
      const predicted_class_name = class_names[predicted_class];
      setLabel(predicted_class_name);
    } catch (error) {
      Alert.alert('Error', 'Error while Predicting\nPlease TRY AGAIN', [
        {
          text: 'Cancel',
          onPress: () => {navigateToDiagnoseScreen},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
      ]);
    }
  };

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
        offset += 3;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const classifyImages = async (imageUri) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
        {compress: 0.5}
      );
      const base64Data = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const uint8Array = Buffer.from(base64Data, 'base64');
      const imageTensor = imageToTensor(uint8Array, 3);
      const normalized = imageTensor.toFloat().div(tf.scalar(255));
      const reshapedImage = tf.reshape(normalized, [-1, 224, 224, 3]);
      
      predictWithModel(reshapedImage);
    } catch (error) {
      Alert.alert('Error', 'Please TRY AGAIN', [
        {
          text: 'Cancel',
          onPress: () => {navigateToDiagnoseScreen},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pick an image"
        onPress={pickImage}
      />
      {pickedImage && <Image
        source={{ uri: pickedImage }}
        style={{ width: 200, height: 200, margin: 40 }}
      />}
      {isLoading ? (
        <Text>Loading Model...</Text>
      ) : (
        <Text>Model Loaded Successfully!</Text>
      )}
      {label ? (
        <Text>The Predicted Label is {label}</Text>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}
