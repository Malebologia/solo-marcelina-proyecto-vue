<script setup>
import { ref } from "vue"
import { useAuth } from "../composables/useAuth"

const email = ref("")
const password = ref("")

const { login } = useAuth()

const iniciarSesion = () => {
  login(email.value, password.value)
}
</script>

<template>

<div class="container py-5">

<h2>Iniciar sesión</h2>

<input
v-model="email"
type="email"
placeholder="Correo"
/>

<input
v-model="password"
type="password"
placeholder="Contraseña"
/>

<button @click="iniciarSesion">
Entrar
</button>

</div>

</template>