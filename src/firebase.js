import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFdTbryWuEXlyaQrUSopFEZX0U8eSLEC8",
  authDomain: "smart-study-planner-2.firebaseapp.com",
  projectId: "smart-study-planner-2",
  storageBucket: "smart-study-planner-2.firebasestorage.app",
  messagingSenderId: "1022008894822",
  appId: "1:1022008894822:web:efe7448905bf31dd92d4a7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);