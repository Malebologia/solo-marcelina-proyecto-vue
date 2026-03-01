import { ref, watch, computed } from 'vue'
import { useAuth } from './useAuth'

const carrito = ref([])

export function useCarrito() {

  const { usuario } = useAuth()

  const obtenerClave = () => {
    if (!usuario.value) return null
    return `carrito_${usuario.value.id}`
  }

  const cargarCarrito = () => {
    const clave = obtenerClave()
    if (!clave) {
      carrito.value = []
      return
    }

    const guardado = localStorage.getItem(clave)
    carrito.value = guardado ? JSON.parse(guardado) : []
  }

  const guardarCarrito = () => {
    const clave = obtenerClave()
    if (!clave) return
    localStorage.setItem(clave, JSON.stringify(carrito.value))
  }

  const agregar = (producto) => {
    const existente = carrito.value.find(p => p.id === producto.id)

    if (existente) {
      existente.cantidad++
    } else {
      carrito.value.push({
        ...producto,
        cantidad: 1
      })
    }
  }

  const disminuir = (producto) => {
    const existente = carrito.value.find(p => p.id === producto.id)
    if (!existente) return

    if (existente.cantidad > 1) {
      existente.cantidad--
    } else {
      carrito.value = carrito.value.filter(p => p.id !== producto.id)
    }
  }

  const vaciar = () => {
    carrito.value = []
  }

  const total = computed(() => 
    carrito.value.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    )
  )

  const unidades = computed(() => 
    carrito.value.reduce(
      (acc, item) => acc + item.cantidad,
      0
    )
  )

  watch(usuario, cargarCarrito, { immediate: true}) 
  watch(carrito, guardarCarrito, { deep: true })

  return {
    carrito,
    agregar,
    disminuir,
    vaciar,
    total,
    unidades
  }
}
