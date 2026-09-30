import { createAPIFileRoute } from '@tanstack/start/api';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../db';
import { contactMessages, products } from '../../../db/schema';

// -----------------------------------------------------------------------------
// CONFIGURACIÓN DE SERVICIOS
// -----------------------------------------------------------------------------

// Configuración de Cloudinary para reemplazo de Netlify Blobs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -----------------------------------------------------------------------------
// ENDPOINT 1: FORMULARIO DE CONTACTO (/api/contact)
// Reemplaza Netlify Forms guardando directamente en la base de datos PostgreSQL
// -----------------------------------------------------------------------------
export const ContactRoute = createAPIFileRoute('/api/contact')({
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      const { name, email, message } = data;

      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: 'Todos los campos (nombre, email, mensaje) son requeridos.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Guardar mensaje en PostgreSQL vía Drizzle ORM
      await db.insert(contactMessages).values({
        id: uuidv4(),
        name,
        email,
        message,
        createdAt: new Date(),
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Mensaje recibido correctamente.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Error interno al procesar el mensaje.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
});

// -----------------------------------------------------------------------------
// ENDPOINT 2: SUBIDA DE IMÁGENES (/api/upload)
// Reemplaza Netlify Blobs subiendo archivos directamente a Cloudinary
// -----------------------------------------------------------------------------
export const UploadRoute = createAPIFileRoute('/api/upload')({
  POST: async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return new Response(
          JSON.stringify({ error: 'No se ha adjuntado ningún archivo.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Convertir el archivo a Buffer para transmisión
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Subida hacia Cloudinary
      const uploadResult = await new Promise<{ url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'apex-gold-products' },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve({ url: result.secure_url });
          }
        ).end(buffer);
      });

      return new Response(
        JSON.stringify({ success: true, url: uploadResult.url }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Error al procesar y subir la imagen.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
});
