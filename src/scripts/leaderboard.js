// Firebase config/setup
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, query, collection, getDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGk-pae-b-9s88nYHsN8-zU40dLjjf4Nw",
  authDomain: "photo-tagging-1649a.firebaseapp.com",
  projectId: "photo-tagging-1649a",
  appId: "1:777845205634:web:e0c37008c6fb205863e29b"
};

// Initialize Firebase and db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get all documents in the users collection
const q = query(collection(db, 'users'));

// Get single document
const allDocs = getDocs(q);
allDocs.then((docs) => {
  docs.forEach((doc) => {
    console.log(doc.data());
  })
})


// Get realtime updates of leaderboard. Note that snapshot.docs is an array of all the user documents from firestore
onSnapshot(q, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
  })
},
(error) => {
  console.log(error.message);
});
