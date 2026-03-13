# Informe de Análisis del Proyecto: "Solo Marcelina"

Este documento contiene un análisis técnico completo de la arquitectura, estructura y funcionalidades del proyecto Vue para que tanto el usuario como Gemini puedan entender el código base actual.

## 1. Tecnologías y Herramientas Principales
- **Framework Core:** Vue 3 (utilizando Composition API y la sintaxis `<script setup>`).
- **Enrutamiento:** Vue Router 5 (para SPA - Single Page Application).
- **Backend as a Service (BaaS):** Firebase 12 (Autenticación con Email/Password y base de datos Firestore).
- **Bundler y Herramientas:** Vite 7 (para servidor de desarrollo ágil y construcción) y Vitest para pruebas unitarias.
- **Estilos:** Bootstrap 5.3 para la estructura UI responsiva, junto con CSS personalizado (`coffee-theme.css`).

## 2. Arquitectura General y Estructura de Archivos
La aplicación sigue una arquitectura estándar de Vue:

- `src/main.js`: Es el punto de entrada de la aplicación. Crea la instancia de Vue, integra el enrutador (`router`), importa globalmente los estilos de Bootstrap y el tema personalizado, y monta la aplicación en el DOM (`#app`).
- `src/App.vue`: El componente raíz. Define un layout superior e inferior global, importando componentes estáticos (`<Header />` y `<Footer />`) y renderizando dinámicamente el contenido de las páginas a través de `<router-view />`.
- `src/firebase.js`: Archivo de configuración central. Inicializa Firebase utilizando variables de entorno (`import.meta.env`) protegidas por Vite, y exporta las instancias de Autenticación (`auth`) y base de datos (`db`).

## 3. Enrutamiento (`src/router/index.js`)
Configurado con `createWebHistory` para URLs limpias.
Dispone de las siguientes rutas:
- `/`: **Home** (Página principal con la lista de productos).
- `/carrito`: **Carrito** (La cesta de compra del usuario).
- `/producto/:id`: **ProductoDetalle** (Página que renderiza información específica de un producto).
- `/sobre`, `/contacto`, `/login`: Vistas que aplican **Lazy Loading** (`() => import(...)`) para optimizar el rendimiento y reducir el peso del bundle inicial.
- `/:pathMatch(.*)*`: Ruta comodín para capturar errores 404 (Renderiza **NotFound.vue**).

## 4. Gestión del Estado Centralizado (Composables)
La aplicación no utiliza Vuex ni Pinia. En su lugar, aborda la reactividad de estado global compartida de manera muy eficiente a través de "Composables" personalizados (`src/composables/`):

### `useAuth.js` (Autenticación)
- Mantiene el estado de un usuario global (`const usuario = ref(null)`).
- Implementa funciones asíncronas para interactuar con Firebase: `registrar`, `login` y `logout`.
- Emplea un listener en tiempo real (`onAuthStateChanged`) que detecta cambios de sesión automáticamente y actualiza la UI de toda la app de forma reactiva en base a este estado.

### `useCarrito.js` (Gestión de la compra)
- Almacena internamente el array reactivo de productos (`const carrito = ref([])`).
- **Persistencia con Firestore:** 
  - Al iniciar sesión un usuario, se descarga un carrito guardado en la nube dentro de la colección `carritos` (usando un watcher reactivo sobre la variable `usuario`).
  - También incluye un *Deep Watcher* para que cualquier adición/resta al carrito sobreescriba en Firebase el documento del usuario, guardando en la nube su estado en tiempo real.
- **Órdenes (Checkout):** La función `checkout` requiere que el usuario esté logueado. Toma todos los productos y los inserta en Firestore en la colección `orders` incluyendo el total de la compra y la marca de tiempo del servidor (`serverTimestamp()`). Luego vacía el carrito.
- Expone variables calculadas (`computed`) súper útiles: `total` (suma en dinero) y `unidades` (suma de objetos), listas para ser consumidas por la vista y el componente Header.

## 5. Componentes Reutilizables (`src/components/`)
- **`Header.vue`**: Menú de navegación principal. Consume el total de productos directamente inyectando `useCarrito()`. También lee el estado de sesión `useAuth()` para mostrar condicionalmente el link de Login, el email del perfil o el botón de Cerrar sesión.
- **`ProductoCard.vue`**: Tarjeta (Card) por producto individual. Cuenta con un diseño hover agradable mediante CSS propio y usa `router-link` hacia el detalle del producto. Contiene el botón "Agregar al carrito" conectando de inmediato al método de `useCarrito()`.

## 6. Vistas de la Aplicación (`src/views/`)
- **`Home.vue`**: Usa el ciclo de vida `onMounted` para simular una petición Fetch (`import.meta.env.BASE_URL + "data/productos.json"`) y llenar la grilla con componentes `<ProductoCard />`.
- **`Carrito.vue`**: Componente visual para manipular el carrito. Muestra sub-totales por item e invoca los métodos `agregar`, `disminuir`, `vaciar` y el flujo final de compra `checkout`.
- **`ProductoDetalle.vue`**: Lee el ID por URL (mediante `useRoute().params.id`), vuelve a hacer el fetch del origen `productos.json` y hace el match del producto a pintar.
- **`Login.vue`**: Formulario simple vinculado ("two-way binding" con `v-model`) que dispara la acción de `login` gestionada en el composable de auth.

## Conclusión 
El proyecto es una **Single Page Application moderna, limpia y bien diseñada**. La mejor decisión de arquitectura tomada en este proyecto ha sido la **separación de la lógica de Firebase en funciones modulares ("Composables")** (`useCarrito` y `useAuth`). Esto permite que múltiples componentes consuman y alteren estados (como el total del carrito, o el correo logueado) sin generar repetición de código ni necesidad de instalar librerías complejas de contexto como Pinia o Vuex.
