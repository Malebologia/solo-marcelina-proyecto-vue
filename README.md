# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


🛍️ Solo Marcelina — Tienda Online con Vue 3

Aplicación web de e-commerce desarrollada con Vue 3 + Vite, que permite visualizar productos, agregarlos a un carrito de compras y gestionar el estado global de manera reactiva.

Este proyecto corresponde a la migración de una versión estática (HTML, CSS y JS tradicional) hacia una arquitectura moderna basada en componentes y Composition API.

🚀 Demo

(Aquí puedes agregar enlace cuando lo deployes en Vercel o Netlify)

🧰 Tecnologías Utilizadas

⚡ Vue 3 (Composition API)

⚡ Vite

🧭 Vue Router

🎨 Bootstrap 5

🧪 Vitest

🧪 Vue Test Utils

🗂️ LocalStorage

📦 JavaScript ES6+

🧠 Conceptos Aplicados

Componentes reutilizables

Composables personalizados (useCarrito)

Estado global compartido

Reactividad con ref y computed

Persistencia por usuario en LocalStorage

Rutas dinámicas y ruta 404

Formateo local de moneda (toLocaleString)

Mocking y testing unitario

Manejo de ramas con Git

✨ Funcionalidades

✅ Listado dinámico de productos

✅ Vista detallada por producto

✅ Carrito de compras reactivo

✅ Incrementar / disminuir cantidad

✅ Eliminación automática cuando cantidad = 0

✅ Cálculo automático de subtotal y total

✅ Persistencia por usuario

✅ Navegación SPA

✅ Página 404 personalizada

✅ Footer dinámico con año actual

✅ Pruebas unitarias

🧪 Testing

Se implementaron pruebas unitarias utilizando:

Vitest

Vue Test Utils

jsdom

Componentes testeados:

ProductoCard.vue

Header.vue

Carrito.vue

Para ejecutar los tests:

npx vitest
📂 Estructura del Proyecto
src/
│
├── assets/
├── components/
│   ├── Header.vue
│   ├── Footer.vue
│   └── ProductoCard.vue
│
├── views/
│   ├── Home.vue
│   ├── Carrito.vue
│   └── NotFound.vue
│
├── composables/
│   └── useCarrito.js
│
├── router/
│   └── index.js
│
├── tests/
│   ├── ProductoCard.test.js
│   ├── Header.test.js
│   └── Carrito.test.js
│
└── main.js
🔐 Estado Global (Carrito)

El estado del carrito se implementa mediante un composable personalizado:

useCarrito()

Características:

Estado compartido global

Persistencia por usuario

Cálculo automático de totales

Sin duplicación de productos

Manejo seguro de cantidad

🌿 Flujo de Trabajo con Git

El proyecto fue organizado usando ramas:

main → versión estable

migration/vue-version → migración a Vue

Se utilizó GitHub Desktop para manejo visual del repositorio.

🧱 Instalación

Clonar el repositorio:

git clone https://github.com/Malebologia/solo_marcelina_proyecto.git

Instalar dependencias:

npm install

Ejecutar en desarrollo:

npm run dev
📈 Evolución del Proyecto

Versión 1:

HTML + CSS + JS tradicional

Versión 2:

Migración completa a Vue 3

Componentización

Estado global reactivo

Testing unitario

Próximas mejoras posibles:

Implementación con Pinia

Backend real con API

Autenticación real

Deploy en producción

GitHub Actions

👨‍💻 Autor

Alonso Soto
Desarrollador Frontend en formación
