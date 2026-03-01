import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Header from '../components/Header.vue'

// 🔥 Mock de composables
vi.mock('../composables/useCarrito', () => ({
  useCarrito: () => ({
    unidades: 0
  })
}))

vi.mock('../composables/useAuth', () => ({
  useAuth: () => ({
    usuario: null
  })
}))

describe('Header.vue', () => {

  it('renderiza el nombre de la tienda', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Solo Marcelina')
  })

})
