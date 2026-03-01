import { mount } from '@vue/test-utils'
import ProductoCard from '../components/ProductoCard.vue'

describe('ProductoCard.vue', () => {

  const productoMock = {
    id: 1,
    nombre: 'Collar artesanal',
    precio: 12000,
    img: 'test.jpg'
  }

  it('renderiza nombre y precio correctamente', () => {
    const wrapper = mount(ProductoCard, {
      props: {
        producto: productoMock
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Collar artesanal')
    expect(wrapper.text()).toContain('12.000')
  })

})
