import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbwZd9rgfP_d2uaHVeddo8Ds_5FrUnL3A",
  authDomain: "crwn-clothing-db-2d9a1.firebaseapp.com",
  projectId: "crwn-clothing-db-2d9a1",
  storageBucket: "crwn-clothing-db-2d9a1.appspot.com",
  messagingSenderId: "179146606602",
  appId: "1:179146606602:web:886491a9b67b50a2e977f3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// configura o provider do popup de login do Google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// autentica o usuário no Firebase usando o popup de login do Google
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// registra o usuário logado com o popup do Google no banco de dados do Firebase
export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot", userSnapshot);
  console.log("userSnapshot exists?", userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
