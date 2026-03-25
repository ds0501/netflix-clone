import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDYxTg1SfZgDo2DQL4iaKisU4Cccgx1Crs",
  authDomain: "netflix-clone-48027.firebaseapp.com",
  projectId: "netflix-clone-48027",
  storageBucket: "netflix-clone-48027.firebasestorage.app",
  messagingSenderId: "803390202949",
  appId: "1:803390202949:web:2c75e812a2700bb35caf2c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
      const res =await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
      })
  } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth);
}

export { auth, db, signup, login, logout };