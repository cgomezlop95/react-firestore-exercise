import { initializeApp } from "firebase/app";

import {
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
  doc,
  query, //In order to be able to order by year
  orderBy, //In order to be able to order by year
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDowcY9Vc5CvJhJzhDhnB5-sRA4dBcjOS8",
  authDomain: "songs-736c0.firebaseapp.com",
  projectId: "songs-736c0",
  storageBucket: "songs-736c0.appspot.com",
  messagingSenderId: "1060622724434",
  appId: "1:1060622724434:web:cce60b99de860748855e8b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const songRef = collection(db, "songs");

export const getSongsByDate = async () => {
  const q = query(songRef, orderBy("year"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const getSongById = async (id) => {
  try {
    const songRefbyId = doc(db, "songs", id);
    const song = await getDoc(songRefbyId);

    if (song.exists()) {
      return song.data();
    } else {
      throw new Error("Song not found");
    }
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
};

export const setNewSong = async (data) => {
  try {
    const docRef = doc(songRef);
    await setDoc(docRef, { ...data, id: docRef.id });
    console.log("Document successfully written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const deleteSong = async (documentId) => {
  try {
    await deleteDoc(doc(db, "songs", documentId));
    console.log("Song deleted successfully");
  } catch (error) {
    console.error("Error deleting song:", error);
  }
};
