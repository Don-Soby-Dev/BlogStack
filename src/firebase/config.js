// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXGDsfQBABixKwam5tZAB1uSt8AhKtEps",
  authDomain: "blogstack-e445b.firebaseapp.com",
  projectId: "blogstack-e445b",
  storageBucket: "blogstack-e445b.firebasestorage.app",
  messagingSenderId: "1044406416049",
  appId: "1:1044406416049:web:f517cb5a88a9e9d9192890",
  measurementId: "G-HV05B5DLMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;
