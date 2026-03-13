import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Home from '../views/Home.vue'
import Carrito from '../views/Carrito.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'

// Helper para esperar el auth state inicial de Firebase
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/carrito',
      component: Carrito
    },
    {
      path: '/producto/:id',
      component: ProductoDetalle
    },
    {
      path: '/sobre',
      component: () => import('../views/Sobre.vue')
    },
    {
      path: '/contacto',
      component: () => import('../views/Contacto.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardPersonal.vue'),
      beforeEnter: async (to, from, next) => {
        const user = await getCurrentUser()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
