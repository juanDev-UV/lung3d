// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsWYY3ZCZ_NyatZWxokt1N_LIqZHc6-qw",
  authDomain: "sesion-3-b4fb0.firebaseapp.com",
  projectId: "sesion-3-b4fb0",
  storageBucket: "sesion-3-b4fb0.firebasestorage.app",
  messagingSenderId: "208489581126",
  appId: "1:208489581126:web:c3c95b9abb8d51d8139847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);