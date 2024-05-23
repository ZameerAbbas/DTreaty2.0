import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Button, ActivityIndicator } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

export default function NearMe() {
  // const [model, setModel] = useState(null);
  // const [predictions, setPredictions] = useState([]);
  // const [label, setLabel] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  // const [pickedImage, setPickedImage] = useState('');
  // const [cameraPermission, setCameraPermission] = useState(null);
  // const [cameraReady, setCameraReady] = useState(false);
  // const cameraRef = useRef(null);

  // useEffect(() => {
  //   const loadModel = async () => {
  //     try {
  //       await tf.ready();
  //       const modelJSON = require("../assets/models/model.json");
  //       const modelWeights = require("../assets/models/group1-shard1of1.bin");
  //       const model = await tf.loadGraphModel(
  //         bundleResourceIO(modelJSON, modelWeights)
  //       );
  //       model.predict(tf.zeros([1, 224, 224, 3]));
  //       setModel(model);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error loading model:", error);
  //     }
  //   };

  //   loadModel();
  // }, []);

  // const handleCameraReady = () => {
  //   setCameraReady(true);
  // };

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
  //     return photo.uri;
  //   }
  //   return null;
  // };

  // const classifyImages = async (imageUri) => {
  //   try {
  //     console.log('image:', imageUri)
  //     const resizedImage = await ImageManipulator.manipulateAsync(
  //       imageUri,
  //       [{ resize: { width: 224, height: 224 } }],
  //     );
  //     console.log(resizedImage);
  //     const base64Data = await FileSystem.readAsStringAsync(resizedImage, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     const uint8Array = Buffer.from(base64Data, 'base64');
  //     const imageTensor = imageToTensor(uint8Array, 3);
  //     const normalized = imageTensor.toFloat().div(tf.scalar(255));
  //     const reshapedImage = tf.reshape(normalized, [-1, 224, 224, 3]);
      
  //     predictWithModel(reshapedImage);
  //   } catch (error) {
  //     console.error("Error classifying image:", error);
  //   }
  // };

  // const predictWithModel = async (imageTensor) => {
  //   try {
  //     const predictions = await model.predict(imageTensor).data();
  //     const predicted_class = tf.argMax(predictions).dataSync()[0];
  //     const predicted_class_name = class_names[predicted_class];
  //     setLabel(predicted_class_name);
  //   } catch (error) {
  //     console.error("Error predicting with model:", error);
  //   }
  // };

  // const imageToTensor = (rawImageData) => {
  //   const TO_UINT8ARRAY = true;
  //   const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  //   const buffer = new Uint8Array(width * height * 3);
  //   let offset = 0;
  //   for (let i = 0; i < buffer.length; i += 3) {
  //       buffer[i] = data[offset];
  //       buffer[i + 1] = data[offset + 1];
  //       buffer[i + 2] = data[offset + 2];
  //       offset += 3;
  //   }
  //   return tf.tensor3d(buffer, [height, width, 3]);
  // };

  // const renderCamera = () => {
  //   return (
  //     <View>
  //     <Camera
  //       style={{ height:400, width:300}}
  //       type={Camera.Constants.Type.back}
  //       ref={cameraRef}
  //       onCameraReady={handleCameraReady}
  //     >
  //     </Camera>
  //       <View style={{ height:'auto', width: '50%', }}>
  //         <Button title="Take Picture" onPress={()=>{
  //           handleCameraReady();
  //           takePicture();
  //           classifyImages();
  //         }} disabled={!cameraReady} />
  //       </View>
  //       </View>
  //   );
  // };

  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   {isLoading ? (
    //     <ActivityIndicator size="large" color="#0000ff" />
    //   ) : (
    //     <>
    //       <View style={{ flex: 1 }}>
    //       {renderCamera()}
    //     </View>
    //       {/* {pickedImage && <Image source={{ uri: pickedImage }} style={{ width: 200, height: 200, margin: 40 }} />} */}
    //       {label ? <Text>The Predicted Label is {label}</Text> : <Text> </Text>}
    //     </>
    //   )}
    // </View>
    <View style={{flex:1, justifyContent:"center", alignItems:'center'}}>
      <Text>Hello I am dummy Text. Help my developer from getting error.</Text>
    </View>
  );
}
