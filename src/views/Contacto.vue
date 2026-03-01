<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const mensaje = ref('')
const respuesta = ref('')

const enviarFormulario = () => {
  respuesta.value = '¡Gracias! Te contactaremos pronto.'
  nombre.value = ''
  email.value = ''
  mensaje.value = ''
}
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-4">Contacto</h1>

    <form @submit.prevent="enviarFormulario">

      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="nombre" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Mensaje</label>
        <textarea v-model="mensaje" class="form-control" rows="5" required />
      </div>

      <button class="btn btn-dark rounded-pill">
        Enviar
      </button>

    </form>

    <p class="mt-3">{{ respuesta }}</p>
  </div>
</template>
