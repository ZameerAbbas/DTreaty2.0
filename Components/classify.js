import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { manipulateAsync } from "expo-image-manipulator";
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
  const [isLoading, setIsLoading] = useState(true); // Added state for loading indicator
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Load the image and set it as the state
    const loadAndProcessImage = async () => {
      try {
        const loadimage = require('./applescab.jpg'); // Replace with the path to your image
        setImage(loadimage);
        setReady(true);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };
    loadAndProcessImage();
  }, []);

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
        setIsLoading(false); // Set loading state to false after model is loaded
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    }
    initializeModel();
  }, []);

  useEffect(() => {
    if (model) {
      classifyImages();
    }
  }, [model]);

  /**
   * The `classifyImages` function processes an image, makes predictions using a model, and sets the
   * predicted class label based on the highest probability.
   * @returns The `classifyImages` function is returning either an error message if the image is not
   * defined or the predicted class name after processing and predicting the image.
   */
  /**
   * The `classifyImages` function processes an image, makes predictions using a model, and sets the
   * predicted class label based on the highest probability.
   * @returns The `classifyImages` function is returning either an error message if the image is not
   * defined or the predicted class name after processing and predicting the image.
   */
  const classifyImages = async () => {
    // Process the image and pass it to the model for prediction
    try {
      const imageArray = await preprocessImage(image);
      console.log("image array is L"+imageArray);
      const predictions = await model.predict(tf.tensor([imageArray])).data();
      setPredictions(predictions);
      const predicted_class = tf.argMax(predictions).dataSync()[0];
      const predicted_class_name = class_names[predicted_class];
      setLabel(predicted_class_name);
    } catch (error) {
      console.error("Error processing or predicting:", error);
    }
  };
  

  // Function to process the image
  const preprocessImage = async () => {
    // Manipulate image for resizing and format conversion
    if (!image) {
      console.error('Image is undefined.');
      return null;
    }
  
    // Ensure that image has the 'uri' or 'localUri' property
    if (!image.uri) {
      console.error('Image URI is missing.');
      return null;
    }
    try {
      // Manipulate image for resizing and format conversion
      const manipulatedImage = await manipulateAsync(
        image.uri,
        [{ resize: { width: 224, height: 224 } }],
        { compress: 1, format: "jpeg" }
      );
  
      // Use the 'uri' property of the manipulated image
      const { uri: manipulatedUri } = manipulatedImage;
  
      // Decode the manipulated image to a tensor
      const imageTensor = tf.node.decodeImage(new Uint8Array(manipulatedUri), 3);
  
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
  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <Text>Loading Model...</Text>
      ) : (
        <Text>Model Loaded Successfully!</Text>
      )}
      <Text>{Label}</Text>
    </View>
  );
}
