import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDSdeVG6YxSBtLiO5GV_a8e1ztkcOfyeqY",
  authDomain: "crwn-db-380ed.firebaseapp.com",
  projectId: "crwn-db-380ed",
  storageBucket: "crwn-db-380ed.appspot.com",
  messagingSenderId: "976942581670",
  appId: "1:976942581670:web:faaff359a45860380db167",
  measurementId: "G-QH4LTHZDE6",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// acessa o Firebase para autenticação e ativa o popup para conectar o usuário.
const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(Provider);
