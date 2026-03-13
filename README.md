# 🛍️ Solo Marcelina – Tienda Artesanal

**Vue 3 + Firebase**

Aplicación web que simula una **tienda online de productos artesanales**, donde los usuarios pueden explorar productos, agregarlos al carrito y gestionar su compra.

El proyecto fue desarrollado como parte de mi proceso de aprendizaje en **desarrollo frontend moderno**, enfocándome en arquitectura de aplicaciones con **Vue 3, manejo de estado y persistencia de datos con Firebase**.

---

# 📖 Historia del Proyecto

Este proyecto comenzó como una tienda web simple desarrollada con **HTML, CSS y JavaScript**.

A medida que avanzaba en mi aprendizaje de frameworks modernos decidí **migrar completamente la aplicación a Vue 3**, con el objetivo de:

* mejorar la **arquitectura del proyecto**
* aplicar **componentización**
* implementar **manejo de estado reactivo**
* integrar **autenticación y persistencia de datos**

La migración permitió transformar una aplicación estática en una **SPA moderna con autenticación de usuarios y almacenamiento en la nube**.

---

# 👨‍💻 Mi Rol en el Proyecto

En este proyecto fui responsable de todo el desarrollo:

* Diseño de la arquitectura del proyecto
* Migración del proyecto a **Vue 3**
* Implementación de **Firebase Authentication**
* Persistencia de datos con **Firestore**
* Creación de **composables reutilizables**
* Desarrollo de **pruebas unitarias**
* Diseño de interfaz y experiencia de usuario

---

# 🚀 Demo

🔗 Portafolio
https://malebologia.github.io/portafolio/

🔗 Versión inicial del proyecto
https://malebologia.github.io/solo_marcelina_proyecto/

⭐ Próximamente: versión completa desplegada con **Firebase Hosting**

---

# 🛠 Tecnologías Utilizadas

## Frontend

* Vue 3 (Composition API)
* Vite
* Vue Router
* JavaScript
* HTML5
* CSS3
* Bootstrap

## Backend / Servicios

* Firebase Authentication
* Firebase Firestore

## Testing

* Vitest
* Vue Test Utils

## Control de versiones

* Git
* GitHub

---

# ✨ Funcionalidades Principales

## 🛒 Catálogo de Productos

* Visualización de productos con imagen, nombre y precio
* Componentes reutilizables para las tarjetas de productos

---

## 🧺 Carrito de Compras

* Agregar productos al carrito
* Aumentar o disminuir cantidades
* Eliminar productos
* Vaciar carrito completo
* Cálculo automático del total

---

## 👤 Sistema de Usuarios

Integración con **Firebase Authentication**:

* Registro de usuarios
* Inicio de sesión
* Persistencia de sesión
* Manejo de estado del usuario

---

## ☁ Persistencia de Datos

Se implementó **Firestore** para guardar el carrito de cada usuario.

Estructura de datos:

```
carritos
 └── userId
      └── items
```

Esto permite que:

* cada usuario tenga su propio carrito
* el carrito se mantenga entre sesiones
* los datos se carguen automáticamente al iniciar sesión

---

# 🧠 Arquitectura del Proyecto

La aplicación utiliza **Composition API** con **composables** para separar la lógica del estado y mejorar la reutilización del código.

## Composables principales

### useAuth.js

Maneja:

* registro de usuarios
* login
* logout
* estado del usuario autenticado

### useCarrito.js

Maneja:

* productos del carrito
* agregar productos
* disminuir cantidades
* calcular total
* guardar datos en Firestore

---

# 📂 Estructura del Proyecto

```
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
│
├── router
│   └── index.js
│
└── tests
    ├── Header.test.js
    ├── ProductoCard.test.js
    └── Carrito.test.js
```

---

# 🧪 Pruebas Unitarias

Se implementaron pruebas con **Vitest** para validar componentes clave.

### Componentes testeados

**Header.vue**

* Verifica que el nombre de la tienda se renderice correctamente.

**ProductoCard.vue**

Valida que:

* el nombre del producto se muestre correctamente
* el precio se renderice correctamente

**Carrito.vue**

Comprueba que:

* el mensaje de carrito vacío se muestre cuando corresponde

---

# 🎨 Mejoras de UI Implementadas

Se desarrolló un **tema visual artesanal personalizado** utilizando variables CSS.

```
:root{
 --coffee-1: #f6efe8;
 --coffee-2: #eadccb;
 --coffee-3: #d8bfa8;
 --coffee-4: #b58a62;
 --coffee-5: #8b5e3c;
}
```

Mejoras visuales implementadas:

* Navbar personalizada
* Botones estilizados
* Animación del contador del carrito
* Toast de notificación
* Footer informativo
* Diseño responsive

---

# 🧠 Manejo de Estado

El estado global se maneja mediante **composables** en lugar de Vuex o Pinia.

Ventajas de esta estrategia:

* código más simple
* menor complejidad para proyectos pequeños
* reutilización de lógica entre componentes

---

# ⚙ Instalación del Proyecto

Clonar repositorio:

```
git clone https://github.com/Malebologia/solo-marcelina-proyecto-vue.git
```

Entrar al proyecto:

```
cd solo-marcelina-proyecto-vue
```

Instalar dependencias:

```
npm install
```

Ejecutar proyecto:

```
npm run dev
```

---

# 🧪 Ejecutar pruebas

```
npx vitest
```

---

# 🔄 Mejoras respecto a la versión original

Migración completa de:

HTML + CSS + JavaScript

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

---

# 🚧 Mejoras Futuras

* Implementar **Firebase Hosting**
* Integrar **pasarela de pago**
* Crear **panel de administración**
* Gestión de productos desde Firestore
* Historial de pedidos por usuario
* Protección de rutas privadas

---

# 👨‍💻 Autor

**Alonso Soto**

Frontend Developer

GitHub
https://github.com/Malebologia
