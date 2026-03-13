<template>
  <header class="bg-coffee-dark shadow-sm py-3" aria-label="Navegación principal">
  <div class="container d-flex align-items-center justify-content-between">

    <router-link to="/" class="d-flex align-items-center text-decoration-none gap-2" aria-label="Ir al inicio">
      <img :src="logo" alt="Logotipo de Solo Marcelina" class="logo" />
      <samp class="text-white fw-bold fs-5" aria-hidden="true">Solo Marcelina</samp>
    </router-link>

    <nav class="d-flex align-items-center gap-4" aria-label="Navegación de secciones">

      <router-link to="/" class="nav-btn" aria-label="Página de inicio">
        Inicio
      </router-link>

      <router-link to="/sobre" class="nav-btn" aria-label="Información sobre nosotros">
        Sobre Nosotros
      </router-link>

      <router-link to="/contacto" class="nav-btn" aria-label="Página de contacto">
        Contacto
      </router-link>

      <router-link to="/carrito" class="nav-btn position-relative" :aria-label="`Ir al carrito, tienes ${unidades} productos`">
        <span aria-hidden="true">🛒</span> {{ unidades }}
      </router-link>

      <router-link
       v-if="!usuario"
       to="/login"
       class="nav-btn"
       aria-label="Iniciar sesión"
       >
         Login
      </router-link>

      <div v-if="usuario" class="d-flex align-items-center">
        <span class="me-2 text-white" :aria-label="`Sesión iniciada como ${usuario.email}`">
          {{ usuario.email }}
        </span>

        <button
          class="nav-btn"
          @click="logout"
          :aria-label="`Cerrar sesión de ${usuario.email}`"
        >
          Salir
        </button>
      </div>

    </nav>
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

