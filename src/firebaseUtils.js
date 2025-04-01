import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchSubjects = async () => {
  const querySnapshot = await getDocs(collection(db, "subjects"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
