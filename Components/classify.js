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


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ImageBackground, StatusBar } from 'react-native';
// import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';

// const { height, width } = Dimensions.get('window');

// const ImageClassifier = () => {
//   const [result, setResult] = useState('');
//   const [label, setLabel] = useState('');
// //   const [image, setImage] = useState(require('./applescab.jpg')); // Replace with your default image

//   useEffect(() => {
//     StatusBar.setBarStyle('light-content');
//   }, []);

//   const handleCamera = async () => {
//     let result = await launchCameraAsync({
//       mediaTypes: 'Images',
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
  
//     if (!result.canceled) {
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
  
//     if (!result.canceled) {
//       setResult('');
//       setLabel('Predicting...');
//       getPrediction(result);
//     }
//   };
  
//   const getPrediction = async (imageData) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: imageData.uri,
//         type: 'image/jpeg', // Specify the correct MIME type of the image
//         name: 'diseasePic.jpeg', // Provide a name for the file
//       });
  
//       const response = await axios.post('https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         timeout: 10000,
//       });
  
//       const { data } = response;
//       console.log("data", {data});
  
//       if (data && data.class) {
//         setLabel(data.class);
//         setResult(data.confidence);
//       } else {
//         setLabel('Failed to predict');
//       }
//     } catch (error) {
//       // Handle errors
//       if (error.response) {
//         // Server responded with a status code outside of 2xx
//         console.error('Server responded with error:', error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//       } else {
//         // Other errors
//         console.error('Error:', error.message);
//       }
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={{ uri: 'background' }} style={styles.backgroundImage} />
//       <Text style={styles.title}>Potato Disease Prediction App</Text>
//   {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
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


// New Coodededeeedededed


import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PermissionsService, { isIOS } from './Permissions';
import * as ImagePicker from 'expo-image-picker';
import Config from 'react-native-config';
import Constants from 'expo-constants';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
    request.url = configureUrl(config.url);
    return request;
  },
  error => error,
);

export const { height, width } = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};


const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

const ImageClassifier = () => {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getPrediction = async (uri, fileName, type) => {
    try {
      // Read the image file as binary data
      const binaryData = await fetch(uri);
      const blob = await binaryData.blob();
  
      // Convert the binary data to base64 encoding
      const reader = new FileReader();
      reader.readAsDataURL(blob);
  
      reader.onload = async () => {
        const base64Data = reader.result;
  
        // Send the base64-encoded image data in the request body
        const requestData = {
          uri: base64Data,
          fileName: fileName,
          type: type,
        };
  
        const url = 'https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict';
        const response = await axios.post(url, requestData);
        return response.data;
      };
    } catch (error) {
      // Error handling
      if (error.response) {
                // Server responded with a status code outside of 2xx
                console.error('Server responded with error:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Other errors
                console.error('Error:', error.message);
              }
      throw error;
    }
  };

  const manageCamera = async (type) => {
    try {
      if (!(await PermissionsService.hasCameraPermission())) {
        return;
      }
      let pickerResult;
      if (type === 'Camera') {
        pickerResult = await ImagePicker.launchCameraAsync(options);
      } else {
        pickerResult = await ImagePicker.launchImageLibraryAsync(options);
      }
      if (!pickerResult.cancelled) {
        getResult(pickerResult.uri, pickerResult.assets[0].fileName, pickerResult.assets[0].type);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const getResult = async (uri, fileName, type) => {
    try {
      setImage(uri);
      setLabel('Predicting...');
      setResult('');
      const prediction = await getPrediction(uri, fileName, type);
      if (prediction.class) {
        setLabel(prediction.class);
        setResult(prediction.confidence);
      } else {
        setLabel('Failed to predict');
      }
    } catch (error) {
      setLabel('Failed to predict');
    }
  };

  return (
    <View style={[backgroundStyle, styles.outer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        blurRadius={10}
        source={{ uri: 'background' }}
        style={{ height: height, width: width }}
      />
      <Text style={styles.title}>{'Potato Disease \nPrediction App'}</Text>
      <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
        <Image source={{ uri: 'clean' }} style={styles.clearImage} />
      </TouchableOpacity>
      {(image?.length && (
        <Image source={{ uri: image }} style={styles.imageStyle} />
      )) ||
        null}
      {(result && label && (
        <View style={styles.mainOuter}>
          <Text style={[styles.space, styles.labelText]}>
            {'Label: \n'}
            <Text style={styles.resultText}>{label}</Text>
          </Text>
          <Text style={[styles.space, styles.labelText]}>
            {'Confidence: \n'}
            <Text style={styles.resultText}>
              {parseFloat(result).toFixed(2) + '%'}
            </Text>
          </Text>
        </View>
      )) ||
        (image && <Text style={styles.emptyText}>{label}</Text>) || (
          <Text style={styles.emptyText}>
            Use below buttons to select a picture of a potato plant leaf.
          </Text>
        )}
      <View style={styles.btn}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => manageCamera('Camera')}
          style={styles.btnStyle}>
          <Image source={{ uri: 'camera' }} style={styles.imageIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => manageCamera('Photo')}
          style={styles.btnStyle}>
          <Image source={{ uri: 'gallery' }} style={styles.imageIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    position: 'absolute',
    top: (isIOS && 35) || 10,
    fontSize: 30,
    color: '#000',
  },
  clearImage: { height: 40, width: 40, tintColor: '#000' },
  mainOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: height / 1.6,
    alignSelf: 'center',
  },
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#000',
    opacity: 0.8,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },
  imageStyle: {
    marginBottom: 50,
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 0.3,
    borderColor: '#000',
    top: height / 4.5,
  },
  clearStyle: {
    position: 'absolute',
    top: 100,
    right: 30,
    tintColor: '#000',
    zIndex: 10,
  },
  space: { marginVertical: 10, marginHorizontal: 10 },
  labelText: { color: '#000', fontSize: 20 },
  resultText: { fontSize: 32 },
  imageIcon: { height: 40, width: 40, tintColor: '#000' },
  emptyText: {
    position: 'absolute',
    top: height / 1.6,
    alignSelf: 'center',
    color: '#000',
    fontSize: 20,
    maxWidth: '70%',
    
  },
});

export default ImageClassifier;
