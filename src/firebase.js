import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3IG6rpLYyyaDGASXEXEtQzKYXqg9jknk",
  authDomain: "solo-marcelina-vue.firebaseapp.com",
  projectId: "solo-marcelina-vue",
  storageBucket: "solo-marcelina-vue.firebasestorage.app",
  messagingSenderId: "763377991052",
  appId: "1:763377991052:web:cb89269c487e6269b2aaa9"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)