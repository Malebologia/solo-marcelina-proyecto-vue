import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import { ref } from "vue"
import { auth } from "../firebase"

const usuario = ref(null)

export function useAuth(){

  const registrar = async (email, password) => {
    try{
      const credenciales = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      usuario.value = credenciales.user

    }catch(error){
      console.error(error)

      if(error.code === "auth/email-already-in-use"){
        alert("Este correo ya está registrado")
      }
    }
  }

  const login = async (email, password) => {
    try{

      const credenciales = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      usuario.value = credenciales.user

    }catch(error){
      console.error(error)

      if(error.code === "auth/user-not-found"){
        alert("Usuario no encontrado")
      }

      if(error.code === "auth/wrong-password"){
        alert("Contraseña incorrecta")
      }
    }
  }

  const logout = async () => {
    await signOut(auth)
    usuario.value = null
  }

  onAuthStateChanged(auth, (user) => {
    usuario.value = user
  })

  return {
    usuario,
    registrar,
    login,
    logout
  }
}