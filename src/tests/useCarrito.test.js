import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCarrito } from '../composables/useCarrito'

// Mock del módulo de Firebase Firestore para que no intente conectarse de verdad
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn()
}))

// Mock de useAuth para simular usuario logueado o deslogueado y evadir dependencias extra
vi.mock('../composables/useAuth', () => ({
  useAuth: vi.fn(() => ({
    usuario: { value: null } // Simulamos visitante por defecto
  }))
}))

// Mock del archivo local de firebase
vi.mock('../firebase', () => ({
  db: {}
}))

describe('useCarrito Composable Lógica Core', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const { vaciar } = useCarrito()
    vaciar() // Resetea el carrito antes de cada test para no manchar el estado
  })

  it('empieza con un carrito vacío por defecto', () => {
    const { carrito } = useCarrito()
    expect(carrito.value).toEqual([])
  })

  it('agregar() inserta un producto nuevo con cantidad 1', () => {
    const { carrito, agregar } = useCarrito()
    const productoMock = { id: 1, nombre: 'Crema', precio: 1000 }
    
    agregar(productoMock)

    expect(carrito.value).toHaveLength(1)
    expect(carrito.value[0].id).toBe(1)
    expect(carrito.value[0].cantidad).toBe(1)
  })

  it('agregar() el mismo producto incrementa su cantidad', () => {
    const { carrito, agregar } = useCarrito()
    const productoMock = { id: 2, nombre: 'Serum', precio: 2000 }
    
    agregar(productoMock)
    agregar(productoMock)

    expect(carrito.value).toHaveLength(1)
    expect(carrito.value[0].cantidad).toBe(2)
  })

  it('disminuir() resta la cantidad si es mayor a 1', () => {
    const { carrito, agregar, disminuir } = useCarrito()
    const productoMock = { id: 3, nombre: 'Tónico', precio: 500 }
    
    agregar(productoMock)
    agregar(productoMock) // Hay 2
    disminuir(productoMock) // Baja a 1

    expect(carrito.value[0].cantidad).toBe(1)
  })

  it('disminuir() elimina el producto del array si la cantidad era 1', () => {
    const { carrito, agregar, disminuir } = useCarrito()
    const productoMock = { id: 4, nombre: 'Bálsamo', precio: 100 }
    
    agregar(productoMock) // Hay 1
    disminuir(productoMock) // Baja a 0 -> Se borra

    expect(carrito.value).toHaveLength(0)
  })

  it('total y unidades calculan correctamente sus valores computed', () => {
    const { agregar, subtotal, iva, total, unidades } = useCarrito()
    
    agregar({ id: 10, nombre: 'Item 1', precio: 1500 })
    agregar({ id: 10, nombre: 'Item 1', precio: 1500 }) // Queda en 2 items de 1500
    agregar({ id: 11, nombre: 'Item 2', precio: 3000 }) // Queda en 1 item de 3000

    expect(unidades.value).toBe(3) // 2 + 1
    expect(subtotal.value).toBe(6000) // (1500 * 2) + 3000
    expect(iva.value).toBe(1140) // 6000 * 0.19
    expect(total.value).toBe(7140) // 6000 + 1140
  })
})
