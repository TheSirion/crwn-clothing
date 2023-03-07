import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
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

// inicializa e configura o provider do Google
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// singleton que registra o estado de toda a autenticação do usuário no Firebase
// e permite que o usuário faça login com o popup ou redirecionamento do Google
// ele garante que os dados não sejam perdidos durante um redirecionamento, por exemplo
// e que o usuário não precise fazer login novamente
export const auth = getAuth();
// métodos de autenticação do Google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// registra o usuário no banco de dados do Firebase
// se o usuário já existir, retorna o documento do usuário
// se o usuário não existir, cria um novo documento para o usuário
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot", userSnapshot);
  console.log("userSnapshot exists?", userSnapshot.exists());

  // se o usuário não existir no banco de dados, criar um novo registro para aquele usuário
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// cria um novo usuário com e-mail e senha
// e registra o usuário no banco de dados do Firebase
// a função createAuthUserWithEmailAndPassword embrulha a função createUserWithEmailAndPassword
// do Firebase para proteger nosso código de possíveis erros que possam acontecer
// caso a biblioteca do Firebase seja atualizada com mudanças que quebrem nosso código
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
