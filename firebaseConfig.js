// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNI4hp6oLc_ACvBE98ds_sdLyIa2GZd6Y",
  authDomain: "chatapp-a1057.firebaseapp.com",
  projectId: "chatapp-a1057",
  storageBucket: "chatapp-a1057.appspot.com",
  messagingSenderId: "584797171929",
  appId: "1:584797171929:web:5f10f8677f9852716f8ec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const roomRef = collection(db, "rooms");