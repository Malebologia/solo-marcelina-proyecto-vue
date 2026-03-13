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
  <article class="card h-100 producto-card" :aria-label="`Producto: ${producto.nombre}`">

    <router-link :to="`/producto/${producto.id}`" :aria-label="`Ver detalle de ${producto.nombre}`">
     <img
      :src="producto.img"
      :alt="`Imagen de ${producto.nombre}`"
      class="card-img-top producto-img"
     />
    </router-link>

    <div class="card-body d-flex flex-column">
      <h5 aria-hidden="true">{{ producto.nombre }}</h5>
      <p :aria-label="`Precio: ${producto.precio} pesos`">${{ producto.precio.toLocaleString('es-CL') }}</p>

      <button
        class="btn btn-dark mt-auto"
        @click="agregarAlCarrito"
        :aria-label="`Añadir ${producto.nombre} al carrito`"
      >
        Agregar al carrito
      </button>
    </div>
  </article>
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