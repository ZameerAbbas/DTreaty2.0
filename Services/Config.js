// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore"
// import {getAuth} from "firebase/auth"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD13_3XOycHY84hVTmTM1s6_yvlms3gSJE",
  authDomain: "dtreaty-23252.firebaseapp.com",
  projectId: "dtreaty-23252",
  storageBucket: "dtreaty-23252.appspot.com",
  messagingSenderId: "691134132809",
  appId: "1:691134132809:web:2f304422a0fe8503258598"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app)

// const auth = getAuth(app)

// export {db ,app,auth}
if(!firebase.apps.lenght){
    firebase.initializeApp(firebaseConfig)
}
