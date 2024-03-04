import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "./Config";
import firebase from "firebase/compat/app";
import { styled } from "nativewind";

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
  };
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode;
      })
      .catch((error) => {
        alert(error);
      });
    Alert.alert("login successfully");
  };

  return (
    <View style={Styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.OtpText}>Login using Otp</Text>
      <TextInput
        placeholder="Phone Number with Country code "
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.Textinput}
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>
            Send Verification 
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm otp "
        onChangeText={setCode}
        keyboardType="number"
        style={styles.Textinput}
      />
       <TouchableOpacity
        style={styles.sendCode}
        onPress={confirmCode}
      >
        <Text style={styles.buttonText}>
            Confirm Verification 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;



const styles = StyleSheet.create({
container:{
flex:1
},
Textinput:{

}


})