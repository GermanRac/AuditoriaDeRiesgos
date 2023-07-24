import { initializeApp } from "firebase/app";
//import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
//import { addUser } from "../pages/api/users";
//import { getStorage } from "firebase/storage";
//import { useRouter } from "next/router";
const firebaseConfig = {
  apiKey: "AIzaSyDxpQ7VhPfpxCHBqlH3t1Zz8FPZR39V9_Q",
  authDomain: "AIzaSyDxpQ7VhPfpxCHBqlH3t1Zz8FPZR39V9_Q",
  projectId: "gestionriesgos-d2391",
  storageBucket: " gestionriesgos-d2391.appspot.com",
  messagingSenderId:"656320112264",
  appId: "1:656320112264:web:e0ae1dc51caf10fbc8213d",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth();
export default app
export const db = getFirestore(app);
/*export const onFirebaseAuthStateChanged = (onChange) => {
  return onAuthStateChanged(auth,(user) => {
    onChange(user ? user: null)
  })
}*/
