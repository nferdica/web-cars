import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCU54bQ2u9qblrAbmwID93qxILlNaqGBKs",
  authDomain: "web-cars-c059e.firebaseapp.com",
  projectId: "web-cars-c059e",
  storageBucket: "web-cars-c059e.appspot.com",
  messagingSenderId: "222081381060",
  appId: "1:222081381060:web:8d429169463ada4ea6cf91"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };