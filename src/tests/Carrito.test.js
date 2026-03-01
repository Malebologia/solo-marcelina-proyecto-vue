import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Carrito from '../views/Carrito.vue'

// 🔥 Mock del composable
vi.mock('../composables/useCarrito', () => ({
  useCarrito: () => ({
    carrito: [],
    total: 0,
    agregar: vi.fn(),
    disminuir: vi.fn(),
    vaciar: vi.fn()
  })
}))

describe('Carrito.vue', () => {

  it('muestra mensaje cuando el carrito está vacío', () => {
    const wrapper = mount(Carrito)

    expect(wrapper.text()).toContain('Tu carrito está vacío')
  })

})
