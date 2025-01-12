// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSPGVlXf6pFITpkgbyIxZ4Ex2cotQx0cY",
  authDomain: "ai-travel-planner-308ed.firebaseapp.com",
  projectId: "ai-travel-planner-308ed",
  storageBucket: "ai-travel-planner-308ed.firebasestorage.app",
  messagingSenderId: "143797321966",
  appId: "1:143797321966:web:af2296670d0bd271f5b3ff",
  measurementId: "G-32N0PYJ272"
};

// Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)
 /*const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});*/
//const provider= new GoogleAuthProvider()
 //export const auth=getAuth(app)
// export { app, auth,provider };
 //export const provider =GoogleAuthProvider()
