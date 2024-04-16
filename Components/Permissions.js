import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export const isIOS = Platform.OS === 'ios';

function showAlert(msg) {
  Alert.alert('', msg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Settings',
      onPress: () => {
        // In Expo, there's no direct method to open settings, you may guide the user to open settings manually.
        console.log('Open settings manually');
      },
    },
  ]);
}

const hasCameraPermission = async (withAlert = true) => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      if (withAlert) {
        showAlert(
          'Permission not granted for camera. You will not able to use camera in this application.',
        );
      }
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const hasPhotoPermission = async (withAlert = true) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      if (withAlert) {
        showAlert(
          'Permission not granted for photos. You will not able to get photos in this application.',
        );
      }
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const PermissionsService = {
  hasCameraPermission,
  hasPhotoPermission,
};

export default PermissionsService;
