<script setup>
import { useCarrito } from '../composables/useCarrito'

// 1. Añadimos subtotal e iva a la desestructuración
const { 
  carrito, 
  subtotal,
  iva,
  total, 
  agregar, 
  disminuir,
  vaciar,
  checkout
} = useCarrito()

// 2. Helper para estandarizar el formato de moneda CLP localmente en esta vista
const formatCLP = (valor) => {
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
}
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-4">🛒 Tu Carrito</h2>

    <div v-if="carrito.length === 0" class="alert alert-light text-center">
      Tu carrito está vacío
    </div>

    <div v-else>
      <div v-for="item in carrito" :key="item.id" class="card mb-3">
        <div class="card-body d-flex align-items-center">
          <img :src="item.img" :alt="item.nombre" width="70" class="me-3 rounded" />
          
          <div class="flex-grow-1">
            <h6>{{ item.nombre }}</h6>
            <!-- 3. Se eliminó el "Subtotal por item" y se formateó el "Precio unitario" -->
            <p class="mb-0 text-muted">
              {{ item.cantidad }}x {{ formatCLP(item.precio) }}
            </p>
          </div>

          <!-- Botones de aumentar/disminuir mantienen su ARIA -->
          <div class="d-flex flex-column gap-2">
            <button class="btn btn-sm btn-outline-secondary" @click="agregar(item)" :aria-label="`Aumentar una unidad de ${item.nombre}`">+</button>
            <button class="btn btn-sm btn-outline-secondary" @click="disminuir(item)" :aria-label="item.cantidad > 1 ? `Disminuir una unidad de ${item.nombre}` : `Eliminar ${item.nombre} del carrito`">−</button>
          </div>
        </div>
      </div>

      <!-- 4. Nuevo bloque de desglose Financiero -->
      <section class="mt-5 p-4 bg-white rounded shadow-sm" aria-live="polite">
        <div class="row justify-content-end">
          <div class="col-md-6 col-lg-5">
            <div class="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal:</span>
              <span>{{ formatCLP(subtotal) }}</span>
            </div>
            
            <div class="d-flex justify-content-between mb-3 text-muted">
              <span>IVA (19%):</span>
              <span>{{ formatCLP(iva) }}</span>
            </div>
            
            <hr class="mt-0 mb-3" />
            
            <div class="d-flex justify-content-between mb-4 fs-4 fw-bold">
              <span>Total a pagar:</span>
              <span>{{ formatCLP(total) }}</span>
            </div>

            <div class="d-flex gap-2 justify-content-end">
              <button class="btn btn-outline-danger" @click="vaciar" aria-label="Vaciar todo el carrito">
                Vaciar carrito
              </button>
              <button class="btn btn-dark px-4" @click="checkout" aria-label="Confirmar compra y pagar">
                Procesar Pago
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
