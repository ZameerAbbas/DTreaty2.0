import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const NearMe = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [model, setModel] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const classifyUsingCustomModel = async () => {
    try {
      await tf.ready();
      setIsTfReady(true);

      // Load your custom model
      const modelJson = require('../assets/models/model.json');
      const modelWeights = require('../assets/models/group1-shard1of1.bin');
      const loadedModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      setModel(loadedModel);

      const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = Buffer.from(imgB64, 'base64');
      const raw = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(raw);

      // Perform inference with your custom model
      const prediction = model.predict(imageTensor);
      setResult(prediction.toString()); // You should process the prediction according to your model output
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pickedImage) {
      classifyUsingCustomModel();
    }
  }, [pickedImage]);

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {pickedImage && <Image
        source={{ uri: pickedImage }}
        style={{ width: 200, height: 200, margin: 40 }}
      />}
      {isTfReady && (
        <Button
          title="Pick an image"
          onPress={pickImage}
        />
      )}
      <View style={{ width: '100%', height: 20 }} />
      {!isTfReady && <Text>Loading TFJS model...</Text>}
      {isTfReady && result === '' && <Text>Pick an image to classify!</Text>}
      {result !== '' && <Text>{result}</Text>}
    </View>
  );
};

export default NearMe;


