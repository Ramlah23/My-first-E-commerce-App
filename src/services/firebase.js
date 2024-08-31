import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDxBksTHogB7ANXkvchmKoEZCE9kWog5OQ",
  authDomain: "mi-primer-e-commerce-c1704.firebaseapp.com",
  projectId: "mi-primer-e-commerce-c1704",
  storageBucket: "mi-primer-e-commerce-c1704.appspot.com",
  messagingSenderId: "532203306670",
  appId: "1:532203306670:web:61e62cbec80896af1cb73f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 

