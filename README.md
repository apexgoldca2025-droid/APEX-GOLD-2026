# 🛡️ Catálogo Táctico — APEX GOLD

Un catálogo web moderno, rápido e intuitivo diseñado para exhibir equipamiento, indumentaria y accesorios tácticos. Permite a los usuarios explorar productos, aplicar filtros avanzados por categoría y realizar consultas directas vía WhatsApp con un mensaje pre-llenado.

---

## 🚀 Características Principales

- ** Catálogo Interactivo:** Búsqueda en tiempo real y filtrado dinámico por categoría (Botas, Indumentaria, Iluminación, Cuchillos, Mochilas).
- ** Ficha de Producto:** Vista detallada con selector de tallas, variantes de color, disponibilidad en stock y galería de imágenes.
- ** Pedidos & Consultas por WhatsApp:** Botón directo que genera una URL con un mensaje personalizado (`https://wa.me/...`) incluyendo el nombre, color y talla seleccionada del producto.
- ** Formulario de Contacto Directo:** Espacio para consultas de ventas al mayor o soporte al cliente.
- ** Panel Administrativo (CMS):** Interfaz para agregar, editar, ocultar o eliminar productos del catálogo de forma sencilla.
- ** Diseñado para Móviles (Responsive):** Experiencia de navegación fluida desde smartphones y tablets.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 19 / Vite / Tailwind CSS 4
- **Routing & State:** TanStack Router / TanStack Query
- **Base de Datos:** PostgreSQL
- **ORM:** Drizzle ORM
- **Gestión de Imágenes:** Cloudinary API
- **Autenticación (Admin):** JWT & HTTP-Only Cookies

---

## 📁 Estructura del Proyecto

```text
.
├── app/
│   ├── components/       # Componentes reutilizables (Tarjetas, Filtros, Navbar, Footer)
│   ├── routes/           # Rutas públicas (/productos, /contacto) y protegidas (/admin)
│   └── api/              # Endpoints para backend (Upload de imágenes, Mensajes, Auth)
├── db/
│   ├── schema.ts         # Definición de las tablas (Productos, Usuarios, Mensajes)
│   └── index.ts          # Conexión a PostgreSQL
├── public/               # Assets estáticos (Logos, favicons, banners)
├── .env.example          # Plantilla de variables de entorno
├── drizzle.config.ts     # Configuración de migraciones
└── package.json
