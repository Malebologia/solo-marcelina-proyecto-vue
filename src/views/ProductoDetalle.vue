<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const producto = ref(null)

const BASE_URL = import.meta.env.BASE_URL

onMounted(async () => {
  const response = await fetch(
    BASE_URL + "data/productos.json"
  )
  const productos = await response.json()

  producto.value = productos.find(
    p => p.id === Number(route.params.id)
  )
})
</script>

<template>
  <div v-if="producto">
    <h2>{{ producto.nombre }}</h2>
    <img
      :src="BASE_URL + producto.img"
      style="height:300px; object-fit:cover;"
    />
    <p>{{ producto.descripcion }}</p>
    <h3>${{ producto.precio }}</h3>
  </div>

  <div v-else>
    <p>Producto no encontrado</p>
  </div>
</template>
