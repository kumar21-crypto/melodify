// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvwWtZU9MY5JCxVJ64P9iCkzDC_9-7zWM",
  authDomain: "melodify-6ec92.firebaseapp.com",
  projectId: "melodify-6ec92",
  storageBucket: "melodify-6ec92.firebasestorage.app",
  messagingSenderId: "752628484786",
  appId: "1:752628484786:web:e9eea3f5041114267a57ab",
  measurementId: "G-JW0PR0ZWGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth,db };
export default app;