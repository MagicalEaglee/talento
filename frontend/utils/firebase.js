
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyD8O7Pc-TEwBZTnDg77_0fB_dzeFF00pxc",
  authDomain: "talentolink-e846e.firebaseapp.com",
  projectId: "talentolink-e846e",
  storageBucket: "talentolink-e846e.appspot.com",
  messagingSenderId: "60650798821",
  appId: "1:60650798821:web:9108faa5d510b9f655de0c",
  measurementId: "G-VDXQ0ZBPP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore()
export const auth=getAuth()
export default app