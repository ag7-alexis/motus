import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAMZgJD0jKLi_Nuo3lgjTGzu-7NPTaEeWI",
  authDomain: "esgi-motus.firebaseapp.com",
  projectId: "esgi-motus",
  storageBucket: "esgi-motus.appspot.com",
  messagingSenderId: "104338010851",
  appId: "1:104338010851:web:58aeb096512560f3b94bd6",
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()