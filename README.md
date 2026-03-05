Solo Marcelina – Tienda Artesanal (Vue + Firebase)

Proyecto de tienda web desarrollado inicialmente con HTML, CSS y JavaScript, posteriormente migrado a Vue 3 para mejorar la arquitectura, escalabilidad y manejo del estado de la aplicación.

La aplicación simula una tienda online de productos artesanales llamada Solo Marcelina, donde los usuarios pueden explorar productos, agregarlos al carrito y gestionar su compra.

Tecnologías utilizadas
Frontend

Vue 3 (Composition API)

Vite

Vue Router

JavaScript

HTML5

CSS3

Bootstrap

Backend / Servicios

Firebase Authentication (registro y login)

Firebase Firestore (persistencia de carrito por usuario)

Testing

Vitest

Vue Test Utils

Control de versiones

Git

GitHub

Funcionalidades principales
°Catálogo de productos

Visualización de productos con imagen, nombre y precio.

Componentes reutilizables para las tarjetas de productos.

°Carrito de compras

Agregar productos al carrito.

Aumentar o disminuir cantidades.

Eliminar productos.

Vaciar carrito completo.

Cálculo automático del total.

°Sistema de usuarios

Integración con Firebase Authentication:

Registro de usuarios

Inicio de sesión

Persistencia de sesión

Manejo de estado de usuario

°Persistencia de datos

Se implementó Firestore para guardar el carrito de cada usuario.

Cada usuario tiene su propio documento en la colección:

carritos
   └── userId
        └── items

Esto permite que:

Cada usuario tenga su propio carrito

El carrito se mantenga entre sesiones

Los datos se carguen automáticamente al iniciar sesión

°Arquitectura del proyecto

El proyecto utiliza Composition API con composables para manejar la lógica.

Composables principales
useAuth.js

Maneja:

registro

login

logout

estado del usuario

useCarrito.js

Maneja:

productos del carrito

agregar productos

disminuir cantidades

calcular total

guardar en Firestore

°Estructura del proyecto
src
│
├── components
│   ├── Header.vue
│   ├── Footer.vue
│   └── ProductoCard.vue
│
├── views
│   ├── Home.vue
│   ├── Carrito.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Sobre.vue
│   ├── Contacto.vue
│   └── NotFound.vue
│
├── composables
│   ├── useAuth.js
│   └── useCarrito.js
│
├── firebase.js
├── router
│   └── index.js
│
└── tests
    ├── Header.test.js
    ├── ProductoCard.test.js
    └── Carrito.test.js
 °Pruebas unitarias

Se implementaron pruebas unitarias con Vitest para validar componentes clave.

Componentes testeados
Header.vue

Verifica que el nombre de la tienda se renderice correctamente.

ProductoCard.vue

Valida que:

el nombre del producto se muestre

el precio se renderice correctamente.

Carrito.vue

Comprueba que:

el mensaje de carrito vacío se muestre cuando corresponde.

°Mejoras de UI implementadas

Se desarrolló un tema visual personalizado con estilo artesanal utilizando variables CSS:

:root{
  --coffee-1: #f6efe8;
  --coffee-2: #eadccb;
  --coffee-3: #d8bfa8;
  --coffee-4: #b58a62;
  --coffee-5: #8b5e3c;
}

Se añadieron mejoras como:

Navbar personalizada

Botones estilizados

Animación del contador del carrito

Toast de notificación

Footer informativo

Diseño responsive

°Manejo de estado

El estado global se maneja mediante composables en lugar de Vuex o Pinia.

Ventajas:

código más simple

reutilización de lógica

menor complejidad para proyectos pequeños

°Instalación del proyecto

Clonar repositorio:

git clone https://github.com/Malebologia/solo-marcelina-proyecto-vue.git

Entrar al proyecto:

cd solo-marcelina-proyecto-vue

Instalar dependencias:

npm install

Ejecutar proyecto:

npm run dev
 °Ejecutar pruebas
npx vitest
 °Mejoras implementadas respecto a la versión original

Migración completa de:

HTML + CSS + JS

a

Vue 3 + Vite + Firebase

Principales mejoras:

✔ Arquitectura basada en componentes
✔ Manejo de estado reactivo
✔ Persistencia en base de datos
✔ Autenticación de usuarios
✔ Código modular y escalable
✔ Testing automatizado
✔ Mejor organización del proyecto

 °Mejoras futuras

Implementar Firebase Hosting

Integrar pasarela de pago

Agregar panel de administración

Gestión de productos desde Firestore

Historial de pedidos por usuario

Protección de rutas privadas

 °Autor

Alonso Soto

Proyecto desarrollado como parte de portafolio de desarrollo frontend.

GitHub:

https://github.com/Malebologia

⭐ Demo

(Próximamente con Firebase Hosting)
