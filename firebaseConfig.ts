import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyArSByOf3xvRIy6sZZlerSQlXsMSUrX17k",
  authDomain: "react-native-projet-c8be7.firebaseapp.com",
  projectId: "react-native-projet-c8be7",
  storageBucket: "react-native-projet-c8be7.firebasestorage.app",
  messagingSenderId: "393594655301",
  appId: "1:393594655301:android:9c12d81184766d167b892c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };