<script setup>
import { useCarrito } from '../composables/useCarrito'

const props = defineProps({
  producto: Object
})

const { agregar } = useCarrito()

const agregarAlCarrito = () => {
  agregar(props.producto)
}

</script>

<template>
  <div class="card h-100 producto-card">

    <router-link :to="`/producto/${producto.id}`">
     <img
      :src="producto.img"
      :alt="producto.nombre"
      class="card-img-top producto-img"
     />
    </router-link>

    <div class="card-body d-flex flex-column">
      <h5>{{ producto.nombre }}</h5>
      <p>${{ producto.precio.toLocaleString('es-CL') }}</p>

      <button
        class="btn btn-dark mt-auto"
        @click="agregarAlCarrito"
      >
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<style scoped>
.producto-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

.producto-img {
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.producto-card:hover .producto-img {
  transform: scale(1.05);
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-body h5 {
  font-weight: 600;
}

.card-body p {
  color: #666;
  margin-bottom: 1rem;
}

button {
  border-radius: 8px;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #222;
}
</style>