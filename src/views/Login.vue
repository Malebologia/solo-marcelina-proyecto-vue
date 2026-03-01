<template>
  <div class="container py-5">
    <h2 class="mb-4">Iniciar Sesión</h2>

    <form @submit.prevent="iniciar">
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required />
      </div>

      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required />
      </div>

      <button class="btn btn-dark">Ingresar</button>
    </form>

    <p class="mt-3">
      ¿No tienes cuenta?
      <button class="btn btn-link p-0" @click="modoRegistro = !modoRegistro">
        {{ modoRegistro ? 'Iniciar sesión' : 'Registrarse' }}
      </button>
    </p>

    <div v-if="modoRegistro" class="mt-3">
      <button class="btn btn-outline-dark" @click="registrarse">
        Crear cuenta
      </button>
    </div>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { login, registrar } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const modoRegistro = ref(false)

const iniciar = () => {
  try {
    login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.message
  }
}

const registrarse = () => {
  try {
    registrar(email.value, password.value)
    error.value = 'Cuenta creada. Ahora inicia sesión.'
  } catch (e) {
    error.value = e.message
  }
}
</script>
