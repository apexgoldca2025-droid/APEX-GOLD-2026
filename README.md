# APEX GOLD — Catálogo Táctico

Catálogo web de APEX GOLD: botas, zapatos, gorras y equipo táctico. Los clientes
exploran el catálogo, filtran por categoría, ven detalles (tallas, colores,
disponibilidad) y consultan cada producto por WhatsApp con un mensaje
pre-llenado. Incluye un formulario de contacto y un panel de administración
protegido para gestionar los productos.

## Funcionalidades

- **Inicio** (`/`): portada, categorías, catálogo con filtros y búsqueda, sección de contacto.
- **Detalle de producto** (`/productos/:id`): imagen, precio, tallas/colores seleccionables y botón "Consultar por WhatsApp".
- **Formulario de contacto**: envíos recibidos con Netlify Forms (panel de Netlify → Forms).
- **Panel admin** (`/admin`, login en `/ingresar`): crear, editar y eliminar productos, subir imágenes, marcar como agotado o destacado.

## Tecnologías

- TanStack Start (React 19, TanStack Router) + Vite + Tailwind CSS 4
- Netlify Database (Postgres) con Drizzle ORM — productos
- Netlify Blobs — imágenes subidas desde el panel
- Netlify Identity — acceso de administradores (rol `admin`)
- Netlify Forms — formulario de contacto
- Netlify Image CDN — imágenes optimizadas (WebP, tamaño adaptado)

## Configurar el primer administrador

1. En Netlify: **Project configuration → Identity → Registration** y ponlo en *Invite only* (recomendado).
2. Opción A: agrega la variable de entorno `ADMIN_EMAILS` (p. ej. `tucorreo@gmail.com`, separados por comas). Esas cuentas reciben el rol `admin` al registrarse/aceptar la invitación.
   Opción B: después de aceptar la invitación, abre el usuario en **Identity** y agrega el rol `admin` manualmente.
3. En **Identity → Invite users**, invita tu correo. Abre el enlace del correo, crea tu contraseña y serás llevado a `/admin`.

## Desarrollo local

```bash
pnpm install
netlify dev
```

La autenticación (Identity) y los formularios solo funcionan en un deploy de
Netlify (preview o producción), no en localhost.

## Base de datos

El esquema está en `db/schema.ts`. Tras cambiarlo, genera una migración:

```bash
npx drizzle-kit generate --name <descripcion_del_cambio>
```

Las migraciones (`netlify/database/migrations/`) se aplican automáticamente en cada deploy. La migración `seed_products` carga los 8 productos iniciales.
