import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Carrito from '../views/Carrito.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'

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
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
