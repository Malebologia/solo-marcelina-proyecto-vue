import { ref, computed, watch } from 'vue'
import { db } from '../firebase'
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from './useAuth'

const carrito = ref([])

export function useCarrito() {

  const { usuario } = useAuth()

  // 🔹 Cargar carrito del usuario
  const cargarCarrito = async () => {

    if (!usuario.value) {
      carrito.value = []
      return
    }

    const docRef = doc(db, 'carritos', usuario.value.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      carrito.value = docSnap.data().items
    } else {
      carrito.value = []
    }

  }

  // 🔹 Guardar carrito en Firestore
  const guardarCarrito = async () => {

    if (!usuario.value) return

    const docRef = doc(db, 'carritos', usuario.value.uid)

    await setDoc(docRef, {
      items: carrito.value
    })

  }

  // 🔹 Agregar producto
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

  // 🔹 Disminuir producto
  const disminuir = (producto) => {

    const existente = carrito.value.find(p => p.id === producto.id)

    if (!existente) return

    if (existente.cantidad > 1) {
      existente.cantidad--
    } else {
      carrito.value = carrito.value.filter(p => p.id !== producto.id)
    }

  }

  // 🔹 Vaciar carrito
  const vaciar = () => {
    carrito.value = []
  }

  // 🔹 Subtotal del carrito
  const subtotal = computed(() => {

    return carrito.value.reduce((acc, item) => {
      return acc + item.precio * item.cantidad
    }, 0)

  })

  // 🔹 IVA (19%)
  const iva = computed(() => {
    return Math.round(subtotal.value * 0.19)
  })

  // 🔹 Total del carrito
  const total = computed(() => {
    return subtotal.value + iva.value
  })

  // 🔹 Cantidad total de productos
  const unidades = computed(() =>

    carrito.value.reduce(
      (acc, item) => acc + item.cantidad,
      0
    )

  )

  // 🔹 Checkout (crear orden)
  const checkout = async () => {

    if (!usuario.value) {
      alert("Debes iniciar sesión para comprar")
      return
    }

    if (carrito.value.length === 0) {
      alert("El carrito está vacío")
      return
    }

    try {

      await addDoc(collection(db, "orders"), {

        userId: usuario.value.uid,
        items: carrito.value,
        total: total.value,
        fecha: serverTimestamp()

      })

      vaciar()

      alert("Compra realizada con éxito 🛍️")

    } catch (error) {

      console.error("Error al crear la orden:", error)
      throw error

    }

  }

  // 🔥 Cuando cambia usuario → cargar carrito
  watch(usuario, () => {

    cargarCarrito()

  }, { immediate: true })


  // 🔥 Cuando cambia carrito → guardar carrito
  watch(carrito, () => {

    guardarCarrito()

  }, { deep: true })


  return {

    carrito,
    agregar,
    disminuir,
    vaciar,
    subtotal,
    iva,
    total,
    unidades,
    checkout

  }

}