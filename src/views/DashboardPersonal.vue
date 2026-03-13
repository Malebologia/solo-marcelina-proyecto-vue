<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useCarrito } from '../composables/useCarrito'
import { useRouter } from 'vue-router'

const { usuario } = useAuth()
const { carrito, subtotal, iva, total, checkout } = useCarrito()
const router = useRouter()

const isCheckingOut = ref(false)

const formatCLP = (valor) => {
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
}

const procesarCompra = async () => {
  isCheckingOut.value = true
  try {
    await checkout()
    router.push('/')
  } catch (error) {
    console.error("Error al procesar compra:", error)
    alert("Hubo un problema procesando tu compra, intenta nuevamente.")
  } finally {
    isCheckingOut.value = false
  }
}
</script>

<template>
  <main class="container py-5">
    <h2 class="mb-4 text-coffee-5 fw-bold">Hola 👋, {{ usuario?.email }}</h2>
    
    <div v-if="carrito.length === 0" class="alert alert-light text-center border-0 shadow-sm">
      Tu carrito está vacío. ¡Anímate a explorar nuestros cosméticos de origen botánico!
    </div>
    
    <div v-else>
      <h4 class="mb-3 text-coffee-4 border-bottom pb-2">Resumen de tu compra</h4>
      
      <div class="table-responsive mb-4 shadow-sm border-0 rounded-3 overflow-hidden">
        <table class="table table-hover align-middle mb-0 bg-white">
          <thead class="bg-coffee-1 text-coffee-5">
            <tr>
              <th scope="col" class="py-3 px-4">Producto</th>
              <th scope="col" class="py-3 px-4">Cantidad</th>
              <th scope="col" class="py-3 px-4 text-end">Precio Unid.</th>
              <th scope="col" class="py-3 px-4 text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carrito" :key="item.id">
              <td class="px-4 fw-medium">{{ item.nombre }}</td>
              <td class="px-4">{{ item.cantidad }}</td>
              <td class="text-end px-4 text-muted">{{ formatCLP(item.precio) }}</td>
              <td class="text-end px-4 fw-semibold">{{ formatCLP(item.precio * item.cantidad) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="row justify-content-end">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-sm border-0 bg-coffee-1">
            <div class="card-body p-4 text-coffee-5">
              <div class="d-flex justify-content-between mb-2 fs-6">
                <span>Subtotal bruto:</span>
                <span class="fw-medium">{{ formatCLP(subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3 fs-6">
                <span>Total IVA (19%):</span>
                <span class="fw-medium">{{ formatCLP(iva) }}</span>
              </div>
              <hr class="border-coffee-3 opacity-25">
              <div class="d-flex justify-content-between mb-4 fw-bold fs-4">
                <span>Total a pagar:</span>
                <span>{{ formatCLP(total) }}</span>
              </div>
              
              <button 
                class="btn btn-coffee w-100 py-2 fs-5 text-white" 
                @click="procesarCompra"
                :disabled="isCheckingOut"
                aria-label="Confirmar transacción de compra final"
              >
                <span v-if="isCheckingOut" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isCheckingOut ? 'Procesando conexión...' : 'Confirmar Compra' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.text-coffee-5 { color: var(--coffee-5); }
.text-coffee-4 { color: var(--coffee-4); }
.bg-coffee-1 { background-color: var(--coffee-1); }
.border-coffee-3 { border-color: var(--coffee-3) !important; }
</style>
