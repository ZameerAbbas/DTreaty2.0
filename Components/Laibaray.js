import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Laibaray = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [label, setLabel] = useState("");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setImage(photo.uri);
      getPrediction(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getPrediction = async (photo) => {
    try {
      if (!photo || !photo.uri) {
        console.error("Invalid image data:", photo);
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await axios.post(
        "https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            "access-control-allow-credentials": true,
          },
        }
      );

      const { data } = response;
      console.log(response);

      if (data && data.class) {
        setLabel(data.class);
        setResult(data.confidence);
        console.log(data.class);
      } else {
        setLabel("Failed to predict");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Crop Doctor</Text>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={{ flex: 1 }}></View>
        </Camera>
      </View>

      <TouchableOpacity onPress={takePicture}>
        <View style={styles.buttonContainer}>
          <Ionicons name="camera" size={50} color={"white"} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Be aware of mistakes. Check important info</Text>
    </View>
  );
};

export default Laibaray;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    height: "60%",
    width: "85%",
    marginBottom: 12,
    overflow: "hidden",
    borderRadius: 50,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 80,
    width: 80,
    backgroundColor: "green",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: -30,
  },
  text: {
    bottom: -60,
    opacity: 0.5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "500",
    top: -30,
    opacity: 0.7,
  },
});
