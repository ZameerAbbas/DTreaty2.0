import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, Image, Alert, Linking } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null); // Initial state null to differentiate between loading state
  const device = useCameraDevice('back'); // Set the initial camera device
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'authorized' || status === 'limited') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'authorized' || permission === 'limited');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Camera permission not granted.</Text>
        <Button
          title="Open Settings"
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }

      const photo = await camera.current.takePhoto();
      console.log(photo);

      if (photo) {
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const confirmPhoto = () => {
    console.log('Photo confirmed:', capturedPhoto);
    setShowPreview(false); // Hide the preview after confirmation
  };

  const retakePhoto = () => {
    setCapturedPhoto(null); // Clear the captured photo
    setShowPreview(false); // Hide the preview
  };

  const onCameraReady = (ref) => {
    camera.current = ref; // Reference to the Camera component (e.g., obtained from ref prop)
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        ref={(ref) => onCameraReady(ref)}
        photo={true}
        video={true}
      />
      {showPreview && capturedPhoto ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: capturedPhoto }} // Assuming the photo is a valid URI
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
