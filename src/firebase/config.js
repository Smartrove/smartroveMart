import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA0gJHXBe4IzfFHscr3KnOXDPYih4z_AJk",
  authDomain: "smartrovemart.firebaseapp.com",
  projectId: "smartrovemart",
  storageBucket: "smartrovemart.appspot.com",
  messagingSenderId: "964742072718",
  appId: "1:964742072718:web:07e9920a9252110c153cdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
