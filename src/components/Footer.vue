<template>
  <footer class="bg-coffee-dark text-light py-4 mt-5">
    <div class="container text-center">
      <p class="mb-2 fw-bold">Solo Marcelina</p>
      <p class="mb-2 small">Tienda online desarrollada con Vue 3</p>
      <p class="mb-0 small">
        © {{ year }} Alonso Soto
      </p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>