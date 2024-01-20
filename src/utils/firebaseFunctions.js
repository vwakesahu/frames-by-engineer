import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase.config";

//saves new item to firebase
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "frames", `${Date.now()}`), data, {
    merge: true,
  });
};


//gets frames from firebase
export const getAllFrames = async () => {
  const items = await getDocs(
    query(collection(firestore, "frames"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};