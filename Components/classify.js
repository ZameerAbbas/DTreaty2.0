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
//       quality: 0.5,
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
//       quality: 0.5,
//     });
  
//     if (!result.canceled) {
//       setResult('');
//       setLabel('Predicting...');
//       getPrediction(result);
//     }
//   };

//   const getPrediction = async (result) => {
//     try {
//       const uriParts = result.assets[0].uri.split('/');
//       const fileName = uriParts[uriParts.length - 1];

//       const formData = new FormData();
//       console.log(formData)
//       formData.append('file', {
//         uri: result.assets[0].uri,
//         type: 'image/jpeg',
//         name: fileName,
//       });
  
//       const response = await axios.post('https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict', formData, {
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'multipart/form-data',
//           'access-control-allow-credentials': true 
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

import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';

const ImageClassifier = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setLoading(true);
      compressImage(photo);
    }
  };

  const compressImage = async (photo) => {
    try {
      const compressedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }], // You can adjust the width as needed
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      getPrediction(compressedPhoto);
    } catch (error) {
      console.error('Error compressing image:', error);
      setLoading(false);
    }
  };

  const getPrediction = async (photo) => {
    try {
      if (!photo || !photo.uri) {
        console.error('Invalid image data:', photo);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post(
        'https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict',
        formData,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'access-control-allow-credentials': true,
          },
        }
      );

      const { data } = response;

      if (data && data.class) {
        
        navigation.navigate('treatment', { prediction: data.class, imageUri: photo.uri });
      } else {
        console.error('Failed to predict');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Crop Doctor</Text>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={{ flex: 1 }}></View>
        </Camera>
      </View>
      <TouchableOpacity onPress={takePicture} disabled={loading}>
        <View style={[styles.buttonContainer, loading && styles.buttonDisabled]}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Ionicons name="camera" size={50} color="white" />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Be aware of mistakes. Check important info</Text>
    </View>
  );
};

export default ImageClassifier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraWrapper: {
    height: '60%',
    width: '85%',
    marginBottom: 12,
    overflow: 'hidden',
    borderRadius: 50,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 80,
    width: 80,
    backgroundColor: 'green',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -30,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  text: {
    bottom: -60,
    opacity: 0.5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '500',
    top: -30,
    opacity: 0.7,
  },
});
