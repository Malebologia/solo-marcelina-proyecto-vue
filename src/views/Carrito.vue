<script setup>
import { useCarrito } from '../composables/useCarrito'


const { 
  carrito, 
  total, 
  agregar, 
  disminuir,
  vaciar
} = useCarrito()
</script>

<template>
  <div class="container py-5">

    <h2 class="mb-4">🛒 Tu Carrito</h2>

    <!-- Estado vacío -->
    <div v-if="carrito.length === 0" class="alert alert-light text-center">
      Tu carrito está vacío
    </div>

    <!-- Lista -->
    <div v-else>
      <div
        v-for="item in carrito"
        :key="item.id"
        class="card mb-3"
      >
        <div class="card-body d-flex align-items-center">

          <img
            :src="item.img"
            :alt="item.nombre"
            width="70"
            class="me-3 rounded"
          />

          <div class="flex-grow-1">
            <h6>{{ item.nombre }}</h6>
            <p class="mb-1 small">
              Precio: ${{ item.precio.toLocaleString('es-CL') }}
            </p>
            <p class="mb-0 fw-bold">
              Subtotal:
              ${{ (item.precio * item.cantidad).toLocaleString('es-CL') }}
            </p>
          </div>

          <div class="d-flex flex-column gap-2">
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="agregar(item)"
            >
              +
            </button>

            <button
              class="btn btn-sm btn-outline-secondary"
              @click="disminuir(item)"
            >
              −
            </button>
          </div>

        </div>
      </div>

      <!-- Total -->
      <div class="text-end mt-4">
        <h4>
          Total: ${{ total.toLocaleString('es-CL') }}
        </h4>

        <button
          class="btn btn-outline-danger me-2"
          @click="vaciar"
        >
          Vaciar carrito
        </button>

        <button class="btn btn-dark">
          Pagar
        </button>

        <button @click="checkout">
          Comprar
        </button>
      </div>

    </div>

  </div>
</template>
