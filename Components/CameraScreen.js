
// import { Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CameraScreen() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//       <View></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 40,
//     justifyContent: 'start',
//     // backgroundColor: 'red'
//   },
//   camera: {
//     flex: 0.7,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 0,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   // btncontainer:{
//   //   flex:0.9,
//   //   backgroundColor: 'red',
//   // },
// });

import React, { useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View className="flex-1 justify-center items-center" />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 justify-center items-center">
        <View className="flex-1 items-center">
          <Text>Lets Diagnose</Text>
          <Camera className="w-full" type={type} />
        </View>
        <TouchableOpacity className="bg-green-500 p-4 rounded-full" onPress={requestPermission}>
          <Ionicons name="ios-camera" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-center">We need your permission to show the camera</Text>
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View className="w-[100%] h-[100vh] flex-1 justify-center items-center">
      <View className="flex-1 items-center">
        <Text className="mt-8 mb-4 text-2xl font-bold">Lets Diagnose</Text>
        <Camera className="w-[50%] mb-4" type={type}>
          {/* <TouchableOpacity className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full" onPress={toggleCameraType}>
            <Ionicons name="ios-reverse-camera" size={32} color="white" />
          </TouchableOpacity> */}
        </Camera>
      </View>
      <TouchableOpacity className="bg-green-500 p-4 rounded-full" onPress={toggleCameraType}>
        <Ionicons name="ios-camera" size={68} color="white" />
      </TouchableOpacity>
      <Text className="text-lg font-bold mt-4">AI can make mistakes, so be careful.</Text>
      <Camera className="w-[50%] mt-4" type={type}>
        <View className="items-center">
          <TouchableOpacity className="bg-black bg-opacity-50 p-2 rounded-full" onPress={toggleCameraType}>
            <Text className="text-white">Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
