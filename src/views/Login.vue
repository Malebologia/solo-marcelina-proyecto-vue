<script setup>
import { ref } from "vue"
import { useAuth } from "../composables/useAuth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const isLoading = ref(false)

const { login } = useAuth()
const router = useRouter()

const iniciarSesion = async () => {
  errorMessage.value = ""
  isLoading.value = true
  
  try {
    await login(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = "Credenciales incorrectas. Por favor, revisa tus datos e intenta nuevamente."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

<main class="container py-5" aria-labelledby="login-title">

<h2 id="login-title">Iniciar sesión</h2>

<form @submit.prevent="iniciarSesion" class="d-flex flex-column gap-3 mt-4" style="max-width: 400px;">
  
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{ errorMessage }}
  </div>

  <div class="form-group">
    <label for="emailInput" class="form-label">Correo electrónico</label>
    <input
      id="emailInput"
      v-model="email"
      type="email"
      class="form-control"
      placeholder="tu@correo.com"
      required
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="passwordInput" class="form-label">Contraseña</label>
    <input
      id="passwordInput"
      v-model="password"
      type="password"
      class="form-control"
      placeholder="Mínimo 6 caracteres"
      required
      aria-required="true"
    />
  </div>

  <button type="submit" class="btn btn-primary mt-3" aria-label="Iniciar sesión con las credenciales introducidas" :disabled="isLoading">
    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    {{ isLoading ? 'Iniciando sesión...' : 'Entrar' }}
  </button>
</form>

</main>

</template>