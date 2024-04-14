// import React, { useState, useEffect } from "react";
// import { View, Text, Image, Button } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// // import * as tfnode from "@tensorflow/tfjs-node";
// import { manipulateAsync } from "expo-image-manipulator";
// import * as ImagePicker from 'expo-image-picker';
// import { Asset } from "expo-asset";
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
// import { decode } from "base64-arraybuffer";

// // Define the JSONHandler class
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
//   const [Label, setLabel] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); 
//   const [pickedImage, setPickedImage] = useState('');



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
//       if (!result.cancelled) {
//         setPickedImage(result.assets[0].uri);
//       } else {
//         console.log("Image picker was cancelled");
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//     }
//     try {
//       // Manipulate image for resizing and format conversion
//       const manipulatedImage = await manipulateAsync(
//         pickedImage,
//         [{ resize: { width: 224, height: 224 } }],
//         { compress: 1, format: "jpeg" }
//       );
//         console.log(typeof(manipulatedImage));
//       if(!manipulatedImage){
//         throw new error("Image data is Null")
//       }
//       const base64Data = manipulatedImage.split(",")[1];

//       // Decode the Base64-encoded image data to an ArrayBuffer
//       const arrayBuffer = decode(base64Data);
//       // const  { uri : pickedImage} = manipulatedImage;
//       // Decode the manipulated image to a tensor
//       const imageTensor = tf.node.decodeImage(arrayBuffer);
  
//       // Normalize the image tensor from [0, 255] to [0, 1]
//       const normalized = imageTensor.toFloat().div(tf.scalar(255));
  
//       // Reshape the image tensor to match model input shape
//       const reshapedImage = normalized.reshape([-1, 224, 224, 3]);
  
//       return reshapedImage;
//     } catch (error) {
//       console.error('Error processing image:', error);
//       return null;
//     }
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
//         // console.log(modelJSON);
//         // console.log(modelWeights);
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

//   useEffect(() => {
//     if (model && pickedImage) {
//       classifyImages();
//     }
//   }, [model]);

//   const classifyImages = async () => {
//     // Process the image and pass it to the model for prediction
//     try {
//       const imageArray = await pickImage();
//       console.log("image array is : "+ imageArray);
//       const predictions = await model.predict(tf.tensor([imageArray])).data();
//       setPredictions(predictions);
//       const predicted_class = tf.argMax(predictions).dataSync()[0];
//       const predicted_class_name = class_names[predicted_class];
//       setLabel(predicted_class_name);
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
//         pickedImage  && <Image
//         source={{ uri: pickedImage }}
//         style={{ width: 200, height: 200, margin: 40 }}
//       />
//       }
//       {isLoading ? (
//         <Text>Loading Model...</Text>
//       ) : (
//         <Text>Model Loaded Successfully!</Text>
       
//       )}
//       {/* <Text>{Label}</Text> */}
      
//     </View>
//   );
// }



// The New Code



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ImageBackground, StatusBar } from 'react-native';
// import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
// import axios from 'axios';

// const { height, width } = Dimensions.get('window');

// const ImageClassifier = () => {
//   const [result, setResult] = useState('');
//   const [label, setLabel] = useState('');
//   const [image, setImage] = useState(require('./applescab.jpg'));

//   useEffect(() => {
//     StatusBar.setBarStyle('light-content');
//   }, []);

//   const getPrediction = async params => {
//     try {
//       const formData = new FormData();
//       formData.append('file', params);
  
//       const response = await axios.post('https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict', formData, { timeout: 10000 });
//       const { data } = response;
  
//       console.log("data", data);
  
//       if (data && data.class) {
//         setLabel(data.class);
//         setResult(data.confidence);
//       } else {
//         setLabel('Failed to predict');
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a non-2xx status code
//         console.error('Server responded with error:', error.response.data);
//         setLabel('Failed to predict: Server Error');
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         setLabel('Failed to predict: No Response');
//       } else {
//         // Something happened in setting up the request that triggered an error
//         console.error('Error setting up the request:', error.message);
//         setLabel('Failed to predict: Request Error');
//       }
//     }
//   };
  
  

//   const handleCamera = async () => {
//     let result = await launchCameraAsync({
//       mediaTypes: 'Images',
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       // setImage(result.uri);
//       setResult('');
//       setLabel('Predicting...');
//       getPrediction(result);
//     }
//   };

//   const handleImageLibrary = async () => {
//     let result = await launchImageLibraryAsync({
//       mediaTypes: 'Images',
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       // setImage(result.uri);
//       setResult('');
//       setLabel('Predicting...');
//       getPrediction(result);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={{ uri: 'background' }} style={styles.backgroundImage} />
//       <Text style={styles.title}>Potato Disease Prediction App</Text>
//       {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
//       <View style={styles.resultContainer}>
//         <Text style={styles.resultText}>Label: {label}</Text>
//         <Text style={styles.resultText}>Confidence: {parseFloat(result).toFixed(2) + '%'}</Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
//           <Ionicons name="camera" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton} onPress={handleImageLibrary}>
//           <Ionicons name="images" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     zIndex: -1,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   image: {
//     width: width - 40,
//     height: width - 40,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   resultContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   resultText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   iconButton: {
//     backgroundColor: '#007bff',
//     padding: 20,
//     borderRadius: 5,
//   },
// });

// export default ImageClassifier;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const ImageClassifier = () => {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
//   const [image, setImage] = useState(require('./applescab.jpg')); // Replace with your default image

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const getPrediction = async (params) => {
    try {
      const formData = new FormData();
      formData.append('file', params);

      const response = await axios.post(process.env.URL, formData, { timeout: 10000 });
      const { data } = response;

      console.log("data", data);

      if (data && data.class) {
        setLabel(data.class);
        setResult(data.confidence);
      } else {
        setLabel('Failed to predict');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a non-2xx status code
        console.error('Server responded with error:', error.response.data);
        setLabel('Failed to predict: Server Error');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setLabel('Failed to predict: No Response');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
        setLabel('Failed to predict: Request Error');
      }
    }
  };

  const handleCamera = async () => {
    let result = await launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setResult('');
      setLabel('Predicting...');
      getPrediction(result.uri);
    }
  };

  const handleImageLibrary = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setResult('');
      setLabel('Predicting...');
      getPrediction(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'background' }} style={styles.backgroundImage} />
      <Text style={styles.title}>Potato Disease Prediction App</Text>
  {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Label: {label}</Text>
        <Text style={styles.resultText}>Confidence: {parseFloat(result).toFixed(2) + '%'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleImageLibrary}>
          <Ionicons name="images" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
  },
  image: {
    width: width - 40,
    height: width - 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 5,
  },
});

export default ImageClassifier;


