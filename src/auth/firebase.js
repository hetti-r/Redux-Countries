// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countriesredux.firebaseapp.com",
  projectId: "countriesredux",
  storageBucket: "countriesredux.appspot.com",
  messagingSenderId: "938204219653",
  appId: "1:938204219653:web:619c02ec589959b8f54f6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      // Redirect to home page after successful logout
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
    console.log("fave added to db");
  } catch (error) {
    console.log("errror removing faves from db", error);
  }
};

const removeFavouriteToFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error("parameter Error removing fave from db");
      return;
    }
    const q = query(
      collection(db, `users/${uid}/favourites`),
      where("name", "==", name)
    );
    //if name matches in db return row of data
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("fave removed from db");
    });
  } catch (error) {
    console.log("errror removing faves from db", error);
  }
};

const clearFavouritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("fave cleared from db");
    });
  } catch (error) {
    console.log("errror clearing faves from db", error);
  }
};

export {
  auth,
  db,
  loginWithEmailAndPassword,
  createUserWithEmailAndPassword,
  addFavouriteToFirebase,
  registerWithEmailAndPassword,
  removeFavouriteToFirebase,
  clearFavouritesFromFirebase,
  logout,
};
