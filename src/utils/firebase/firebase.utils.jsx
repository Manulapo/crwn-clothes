import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// DB CONFIG & INIT------------------------------------------------------------
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGre45o1ZkcKBSst9nhwInstUV-BuTcj4",
  authDomain: "ecom-clothing-db-55892.firebaseapp.com",
  projectId: "ecom-clothing-db-55892",
  storageBucket: "ecom-clothing-db-55892.appspot.com",
  messagingSenderId: "55964341835",
  appId: "1:55964341835:web:da63792c1b0bd0fd789fce",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// GOOGLE AUTH ------------------------------------------------------------
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

// EMAIL AND PASS AUTH ------------------------------------------------------------
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// SIGN OUT USER --------------------------------------------------------------------
export const signOutUser = async () => signOut(auth);

// AUTH STATE CHANGER LISTENER-------------------------------------------------------

// this method takes the auth code (as any other method and a specific callback we want to run anytime the observer change its state)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// DB --------------------------------------------------------------------

// add new collection to DB
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // create a new collection
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // populate collection with document
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

// set a DB for the user to track their auth
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  // create a snapshot of the user
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);

  // if the document does not exist in the collection the exist method will return a false
  // console.log(userSnapshot.exists());
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
      console.log("new User Registered!");
    } catch (err) {
      console.log("error:", err);
    }
  }

  return userDocRef;
};

// geyt categories and map as a feasible undestandable object
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};
