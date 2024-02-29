import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from 'expo-image-picker';
import { Asset } from "expo-asset";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { decode } from "base64-arraybuffer";

// Define the JSONHandler class
class JSONHandler {
  constructor(jsonString) {
    this.jsonString = jsonString;
  }

  async load() {
    const modelJSON = JSON.parse(this.jsonString);
    const modelArtifacts = {
      modelTopology: modelJSON.modelTopology,
      format: modelJSON.format,
      generatedBy: modelJSON.generatedBy,
      convertedBy: modelJSON.convertedBy,
    };
    if (modelJSON.trainingConfig != null) {
      modelArtifacts.trainingConfig = modelJSON.trainingConfig;
    }
    if (modelJSON.userDefinedMetadata != null) {
      modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
    }
    return modelArtifacts;
  }
}

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [Label, setLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [pickedImage, setPickedImage] = useState('');



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("Image Picker Result:", result.assets[0].uri);
      if (!result.cancelled) {
        setPickedImage(result.assets[0].uri);
      } else {
        console.log("Image picker was cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
    try {
      // Manipulate image for resizing and format conversion
      const manipulatedImage = await manipulateAsync(
        pickedImage,
        [{ resize: { width: 224, height: 224 } }],
        { compress: 1, format: "jpeg" }
      );
      // const  { uri : pickedImage} = manipulatedImage;
      // Decode the manipulated image to a tensor
      const imageTensor = tf.node.decodeImage(new Uint8Array(manipulatedImage), 3);
  
      // Normalize the image tensor from [0, 255] to [0, 1]
      const normalized = imageTensor.toFloat().div(tf.scalar(255));
  
      // Reshape the image tensor to match model input shape
      const reshapedImage = normalized.reshape([-1, 224, 224, 3]);
  
      return reshapedImage;
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  };
  

  useEffect(() => {
    // Load the model and initialize TensorFlow.js
    async function initializeModel() {
      try {
        await tf.ready(); // Ensure TensorFlow.js is ready
        const modelJSON = require("../assets/models/model.json");
        const modelWeights = require("../assets/models/group1-shard1of1.bin");
        const modelClasses = require("../assets/models/classes.json");
        const imageSize = 224;
        // console.log(modelJSON);
        // console.log(modelWeights);
        const model = await tf.loadGraphModel(
          bundleResourceIO(modelJSON, modelWeights)
        );
        model.predict(tf.zeros([1, imageSize, imageSize, 3]));
        setModel(model);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    }
    initializeModel();
  }, []);

  useEffect(() => {
    if (model && pickedImage) {
      classifyImages();
    }
  }, [model]);

  const classifyImages = async () => {
    // Process the image and pass it to the model for prediction
    try {
      const imageArray = await pickImage();
      console.log("image array is : "+ imageArray);
      const predictions = await model.predict(tf.tensor([imageArray])).data();
      setPredictions(predictions);
      const predicted_class = tf.argMax(predictions).dataSync()[0];
      const predicted_class_name = class_names[predicted_class];
      setLabel(predicted_class_name);
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
      {
        pickedImage  && <Image
        source={{ uri: pickedImage }}
        style={{ width: 200, height: 200, margin: 40 }}
      />
      }
      {isLoading ? (
        <Text>Loading Model...</Text>
      ) : (
        <Text>Model Loaded Successfully!</Text>
       
      )}
      {/* <Text>{Label}</Text> */}
      
    </View>
  );
}


// import React, { useState, useEffect, useRef } from "react";
// import { View, Text, TouchableOpacity } from "react-native"; // Update import
// import { Camera } from "expo-camera";
// import * as tf from "@tensorflow/tfjs";
// import { manipulateAsync } from "expo-image-manipulator";
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

// class JSONHandler {
//   constructor(jsonString) {
//     this.jsonString = jsonString;
//   }

//   async load() {
//     const modelJSON = JSON.parse(this.jsonString);
//     const modelArtifacts = {
//       modelTopology: modelJSON.modelTopology,
//       format: modelJSON.format,
//       generatedBy: modelJSON.generatedBy,
//       convertedBy: modelJSON.convertedBy,
//     };
//     if (modelJSON.trainingConfig != null) {
//       modelArtifacts.trainingConfig = modelJSON.trainingConfig;
//     }
//     if (modelJSON.userDefinedMetadata != null) {
//       modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
//     }
//     return modelArtifacts;
//   }
// }

// export default function ImageClassifier() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [label, setLabel] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     async function initializeModel() {
//       try {
//         await tf.ready();
//         const modelJSON = require("../assets/models/model.json");
//         const modelWeights = require("../assets/models/group1-shard1of1.bin");
//         const model = await tf.loadGraphModel(
//           bundleResourceIO(modelJSON, modelWeights)
//         );
//         model.predict(tf.zeros([1, 224, 224, 3])); // Corrected the input shape
//         setModel(model);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error loading the model:", error);
//       }
//     }
//     initializeModel();
//   }, []);

//   useEffect(() => {
//     if (model) {
//       classifyImages();
//     }
//   }, [model]);

//   const classifyImages = async () => {
//     try {
//       if (cameraRef.current) {
//         const photo = await cameraRef.current.takePictureAsync();
//         const imageArray = await preprocessImage(photo.uri);
//         const predictions = await model.predict(tf.tensor([imageArray])).data();
//         setPredictions(predictions);
//         const predictedClassIndex = tf.argMax(predictions).dataSync()[0];
//         const predictedClassName = class_names[predictedClassIndex];
//         setLabel(predictedClassName);
//       }
//     } catch (error) {
//       console.error("Error processing or predicting:", error);
//     }
//   };

//   const preprocessImage = async (uri) => {
//     try {
//       const manipulatedImage = await manipulateAsync(
//         uri,
//         [{ resize: { width: 224, height: 224 } }],
//         { compress: 1, format: "jpeg" }
//       );
//       const { uri: resizedUri } = manipulatedImage;
//       const imageTensor = tf.node.decodeImage(new Uint8Array(manipulatedImage), 3);
//       const normalized = imageTensor.toFloat().div(tf.scalar(255));
//       const reshapedImage = normalized.reshape([1, 224, 224, 3]); // Corrected the shape
//       return reshapedImage;
//     } catch (error) {
//       console.error('Error processing image:', error);
//       return null;
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       {isLoading ? (
//         <Text>Loading Model...</Text>
//       ) : (
//         <Text>Model Loaded Successfully!</Text>
//       )}
//       <Camera
//         style={{ width: 300, height: 300 }}
//         type={Camera.Constants.Type.back}
//         ref={cameraRef}
//       />
//       <TouchableOpacity onPress={classifyImages}>
//         <Text>Capture Image</Text>
//       </TouchableOpacity>
//       <Text>{label}</Text> {/* Wrapped label in a Text component */}
//     </View>
//   );
// }

