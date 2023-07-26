import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbwZd9rgfP_d2uaHVeddo8Ds_5FrUnL3A",
  authDomain: "crwn-clothing-db-2d9a1.firebaseapp.com",
  projectId: "crwn-clothing-db-2d9a1",
  storageBucket: "crwn-clothing-db-2d9a1.appspot.com",
  messagingSenderId: "179146606602",
  appId: "1:179146606602:web:886491a9b67b50a2e977f3",
};

// Initializa o Firebase
initializeApp(firebaseConfig);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = "title"
) => {
  // acessa a coleção no banco de dados do Firebase com a chave passada
  const collectionRef = collection(db, collectionKey);
  // permite agrupar várias operações de gravação em uma única solicitação
  const batch = writeBatch(db);

  // para cada objeto no array de objetos, cria um novo documento com o título do objeto
  objectsToAdd.forEach(obj => {
    const docRef = doc(collectionRef, obj[field].toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log("DONE!");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

// registra o usuário no banco de dados do Firebase
// se o usuário já existir, retorna o documento do usuário
// se o usuário não existir, cria um novo documento para o usuário
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

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

// faz o login do usuário com e-mail e senha
// a função signInAuthUserWithEmailAndPassword com o mesmo objetivo
// de proteção contra eventuais mudanças na biblioteca do Firebase
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// faz o logout do usuário
// usando 'auth' como parâmetro para garantir que o usuário
// que está fazendo logout é o mesmo que está logado
export const signOutUser = async () => await signOut(auth);

// observa mudanças no status de login do usuário
export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);
