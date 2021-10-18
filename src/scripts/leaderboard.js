// Firebase config/setup
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, query, collection, getDoc, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { renderLeaderboard } from "./view";

const firebaseConfig = {
  apiKey: "AIzaSyAGk-pae-b-9s88nYHsN8-zU40dLjjf4Nw",
  authDomain: "photo-tagging-1649a.firebaseapp.com",
  projectId: "photo-tagging-1649a",
  appId: "1:777845205634:web:e0c37008c6fb205863e29b"
};

// Initialize Firebase and db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Query all documents in the users collection
const q = query(collection(db, 'users'), orderBy('time'));

// Get realtime updates of leaderboard. Note that snapshot.docs is an array of all the user documents from firestore
onSnapshot(q, (snapshot) => {
  renderLeaderboard(snapshot.docs);
},
(error) => {
  console.log(error.message);
});

// Add new user document into the users collection
const addUser = (name, time) => {
  const users = collection(db, 'users');
  return addDoc(users, {
    name: name,
    time: time,
  });
};

export { addUser };
