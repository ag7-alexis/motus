import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBSbFx0m3-oK0l5BH0Hv_lfgbbVnFUKcHo ",
  authDomain: "m1-pwa-135ff.firebaseapp.com",
  projectId: "m1-pwa-135ff",
  storageBucket: "m1-pwa-135ff.appspot.com",
  messagingSenderId: "1091784061654",
  appId: "1:104338010851:web:58aeb096512560f3b94bd6",
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

