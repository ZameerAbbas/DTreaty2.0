// /**
//  * The `OfflineClassifier` function in React Native uses TensorFlow.js to load a pre-trained model for
//  * image classification and allows users to pick an image from the library to classify it.
//  * @returns The `OfflineClassifier` component is being returned. It contains a view with a button to
//  * pick an image, display the picked image, show loading status for model initialization, a button to
//  * classify the image, and the predicted label for the image.
//  */
// import React, { useState, useEffect } from "react";
// import { View, Text, Image, Button } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import * as ImagePicker from 'expo-image-picker';
// import { bundleResourceIO, decodeJpeg, decodeImage } from "@tensorflow/tfjs-react-native";
// import { Buffer } from 'buffer';
// import * as FileSystem from 'expo-file-system';

// // Define the JSONHandler class
// // class JSONHandler {
// //   constructor(jsonString) {
// //     this.jsonString = jsonString;
// //   }

// //   async load() {
// //     const modelJSON = JSON.parse(this.jsonString);
// //     const modelArtifacts = {
// //       modelTopology: modelJSON.modelTopology,
// //       format: modelJSON.format,
// //       generatedBy: modelJSON.generatedBy,
// //       convertedBy: modelJSON.convertedBy,
// //     };
// //     if (modelJSON.trainingConfig != null) {
// //       modelArtifacts.trainingConfig = modelJSON.trainingConfig;
// //     }
// //     if (modelJSON.userDefinedMetadata != null) {
// //       modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
// //     }
// //     return modelArtifacts;
// //   }
// // }

// export default function OfflineClassifier() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [Label, setLabel] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [pickedImage, setPickedImage] = useState('');
//   const class_names = [
//     "ceviche",
//     "cheese_plate",
//     "cheesecake",
//     "chicken_curry",
//     "chicken_quesadilla",
//     "chicken_wings",
//     "chocolate_cake",
//     "chocolate_mousse",
//     "churros",
//     "clam_chowder"
//   ]



//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       console.log("Image Picker Result:", result.assets[0].uri);
//       if (!result.canceled) {
//         setPickedImage(result.assets[0].uri);
//         // console.log(typeof (pickedImage))
//       } else {
//         console.log("Image picker was cancelled");
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//     }
//     return pickedImage;
//   };


//   useEffect(() => {
//     // Load the model and initialize TensorFlow.js
//     async function initializeModel() {
//       try {
//         await tf.ready();
//         const modelJSON = require("../assets/models/model.json");
//         const modelWeights = require("../assets/models/group1-shard1of1.bin");
//         const modelClasses = require("../assets/models/classes.json");

//         const imageSize = 224;
//         const model = await tf.loadGraphModel(
//           bundleResourceIO(modelJSON, modelWeights)
//         );
//         model.predict(tf.zeros([1, imageSize, imageSize, 3]));
//         setModel(model);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error loading the model:", error);
//       }
//     }
//     initializeModel();
//   }, []);

//   // useEffect(() => {
//   //   if (model && pickedImage) {
//   //     classifyImages();
//   //   }
//   // }, [model]);


//   const predictWithModel = async (imageTensor) => {
//     try {
//       const predictions = await model.predict(imageTensor).data();
//       setPredictions(predictions);
//       const predicted_class = tf.argMax(predictions).dataSync()[0];
//       const predicted_class_name = class_names[predicted_class];
//       setLabel(predicted_class_name);
//     } catch (error) {
//       console.error("Error predicting:", error);
//     }
//   };

//   const classifyImages = async () => {
//     try {

//       const manipulatedImage = await pickImage();
//       if (!manipulatedImage) {
//         throw new Error("Error processing image");
//       }

//       console.log("Manipulated Image:", manipulatedImage);

//       const base64Data = await FileSystem.readAsStringAsync(manipulatedImage, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       console.log("base64 datatype: ", typeof (base64Data))

//       // Convert Base64 image data to Uint8Array
//       const uint8Array = Buffer.from(base64Data, 'base64');
//       console.log("uint8Array datatype: ", typeof (uint8Array))

//       // Create tensor from Uint8Array image data
//       const imageTensor = decodeImage(uint8Array);

//       // Normalize the image tensor from [0, 255] to [0, 1]
//       const normalized = imageTensor.toFloat().div(tf.scalar(255));

//       // Reshape the image tensor to match model input shape
//       const reshapedImage = normalized.reshape([-1, 224, 224, 3]);

//       predictWithModel(reshapedImage);
//     } catch (error) {
//       console.error("Error processing or predicting:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

//       <Button
//         title="Pick an image"
//         onPress={pickImage}
//       />
//       {
//         pickedImage && <Image
//           source={{ uri: pickedImage }}
//           style={{ width: 200, height: 200, margin: 40 }}
//         />
//       }
//       {isLoading ? (
//         <Text>Loading Model...</Text>
//       ) : (
//         <Text>Model Loaded Successfully!</Text>

//       )}
//       <Button
//         title="Classify"
//         onPress={pickImage}
//       />
//       <Text>{Label}</Text>

//     </View>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { View, Text, Image, Button } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import * as ImagePicker from 'expo-image-picker';
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
// import { Buffer } from 'buffer';
// import * as FileSystem from 'expo-file-system';
// import * as jpeg from 'jpeg-js'

// export default function OfflineClassifier() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [label, setLabel] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [pickedImage, setPickedImage] = useState('');
//   const class_names = [
//     "ceviche",
//     "cheese_plate",
//     "cheesecake",
//     "chicken_curry",
//     "chicken_quesadilla",
//     "chicken_wings",
//     "chocolate_cake",
//     "chocolate_mousse",
//     "churros",
//     "clam_chowder"
//   ];

//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       if (!result.canceled) {
//         setPickedImage(result.assets[0].uri);
//         classifyImages(result.assets[0].uri); // Classify the picked image
//       } else {
//         console.log("Image picker was cancelled");
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//     }
//   };

//   useEffect(() => {
//     async function initializeModel() {
//       try {
//         await tf.ready();
//         const modelJSON = require("../assets/models/model.json");
//         const modelWeights = require("../assets/models/group1-shard1of1.bin");

//         const model = await tf.loadGraphModel(
//           bundleResourceIO(modelJSON, modelWeights)
//         );
//         model.predict(tf.zeros([1, 224, 224, 3]));
//         setModel(model);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error loading the model:", error);
//       }
//     }
//     initializeModel();
//   }, []);

//   const predictWithModel = async (imageTensor) => {
//     try {
//       const predictions = await model.predict(imageTensor).data();
//       setPredictions(predictions);
//       const predicted_class = tf.argMax(predictions).dataSync()[0];
//       const predicted_class_name = class_names[predicted_class];
//       setLabel(predicted_class_name);
//     } catch (error) {
//       console.error("Error predicting:", error);
//     }
//   };

//   const classifyImages = async (imageUri) => {
//     try {
//       const base64Data = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       const uint8Array = Buffer.from(base64Data, 'base64');
//       const imageTensor = tf.io.decode_image(uint8Array, channels = 3,
//         expand_animations = false);
//       const normalized = imageTensor.toFloat().div(tf.scalar(255));
//       const reshapedImage = normalized.reshape([-1, 224, 224, 3]);
//       predictWithModel(reshapedImage);
//     } catch (error) {
//       console.error("Error processing or predicting:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         title="Pick an image"
//         onPress={pickImage}
//       />
//       {pickedImage && <Image
//         source={{ uri: pickedImage }}
//         style={{ width: 200, height: 200, margin: 40 }}
//       />}
//       {isLoading ? (
//         <Text>Loading Model...</Text>
//       ) : (
//         <Text>Model Loaded Successfully!</Text>
//       )}
//       <Text>{label}</Text>
//     </View>
//   );
// }



import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from 'expo-image-picker';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImageManipulator from 'expo-image-manipulator';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js'

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
        classifyImages(result.assets[0].uri); // Classify the picked image
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
        console.error("Error loading the model:", error);
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
      console.error("Error predicting:", error);
    }
  };

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
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
      console.log("Image URI: ", imageUri);
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
      );
      console.log("Resized Image: ", resizedImage.uri);
  
      const base64Data = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const uint8Array = Buffer.from(base64Data, 'base64');
      const imageTensor = imageToTensor(uint8Array, 3); // Ensure this function correctly converts the image data to a tensor
      console.log("Image Tensor: ", imageTensor);
      
      // Check the shape of the image tensor and adjust as necessary
      console.log("Image Tensor Shape: ", imageTensor.shape);
      
      const normalized = imageTensor.toFloat().div(tf.scalar(255));
      console.log('Normalized: ', normalized);
      
      // Reshape the tensor to match the expected input shape of your model
      const reshapedImage = tf.reshape(normalized, [-1, 224, 224, 3]);
      console.log("Reshaped Image: ", reshapedImage);
      
      predictWithModel(reshapedImage);
    } catch (error) {
      console.error("Error processing or predicting:", error);
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
      <Text>{label}</Text>
    </View>
  );
}
