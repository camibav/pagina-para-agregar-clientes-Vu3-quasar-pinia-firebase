
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS3HpmINrJV9pse16DTTdqLjUeYJdG0Hk",
  authDomain: "myownproject-508b0.firebaseapp.com",
  projectId: "myownproject-508b0",
  storageBucket: "myownproject-508b0.appspot.com",
  messagingSenderId: "401331912486",
  appId: "1:401331912486:web:56b78f939b353ac0620be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth ,storage };

