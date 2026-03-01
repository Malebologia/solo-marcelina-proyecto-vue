<template>
  <header class="bg-coffee-dark shadow-sm py-3">
  <div class="container d-flex align-items-center justify-content-between">

    <router-link to="/" class="d-flex align-items-center text-decoration-none gap-2">
      <img :src="logo" alt="Solo Marcelina" class="logo" />
      <samp class="text-white fw-bold fs-5">Solo Marcelina</samp>
    </router-link>

    <nav class="d-flex align-items-center gap-4">

      <router-link to="/" class="nav-btn">
        Inicio
      </router-link>

      <router-link to="/sobre" class="nav-btn">
        Sobre Nosotros
      </router-link>

      <router-link to="/contacto" class="nav-btn">
        Contacto
      </router-link>

      <router-link to="/carrito" class="nav-btn position-relative">
        🛒 {{ unidades }}
      </router-link>

    </nav>

    <router-link to="/login" v-if="!usuario" class="nav-btn">
      Login
    </router-link>

    <span v-else class="text-white">
      {{ usuario.email }}
    </span>

    <button v-if="usuario" @click="logout" class="nav-btn">
      Salir
    </button>

  </div>
</header>

</template>

<script setup>
import { useCarrito } from '../composables/useCarrito'
import logo from '../assets/logo.png'
import { useAuth } from '../composables/useAuth'

const { unidades } = useCarrito()
const { usuario, logout } = useAuth()
</script>

