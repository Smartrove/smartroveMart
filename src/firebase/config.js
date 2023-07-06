import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBASE_API_KEY,
  authDomain: process.env.REACT_APP_FBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FBASE_MESSAGE_SENDERID,
  appId: process.env.REACT_APP_FBASE_MESSAGE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
