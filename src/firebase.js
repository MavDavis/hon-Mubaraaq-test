import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDgYt2McHU0uhK5oC2IPMR6g_6YzzeZtBY",
  authDomain: "jumsa-f7761.firebaseapp.com",
  projectId: "jumsa-f7761",
  storageBucket: "jumsa-f7761.appspot.com",
  messagingSenderId: "613247565688",
  appId: "1:613247565688:web:ffcf3e104d2053250e528d"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp);

export const db = getFirestore(firebaseApp);