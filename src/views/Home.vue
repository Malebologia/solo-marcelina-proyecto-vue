<script setup>
import { ref, onMounted } from "vue"
import ProductoCard from "../components/ProductoCard.vue"

const productos = ref([])

onMounted(async () => {
  const response = await fetch(
    import.meta.env.BASE_URL + "data/productos.json"
  )
  productos.value = await response.json()
})
</script>


<template>
  <div class="container mt-5 mb-5">
    <h1 class="text-center mb-5 fw-bold">Nuestra Colección</h1>

    <div class="row g-4">
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <ProductoCard :producto="producto" />
      </div>
    </div>
  </div>
</template>

