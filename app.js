// Configuración
const NUMERO_WHATSAPP = "584126012186"; 

// Lista de productos del catálogo
const productos = [
  {
    id: 1,
    nombre: "Camiseta Algodón",
    precio: 15.00,
    imagen: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    nombre: "Zapatos Deportivos",
    precio: 45.00,
    imagen: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    nombre: "Gorra Camuflada",
    precio: 23.00,
    imagen: "https://via.placeholder.com/200"
  }
];

// Función para renderizar el catálogo
function cargarCatalogo() {
  const contenedor = document.getElementById("catalogo");

  productos.forEach(producto => {
    // Generar el mensaje predeterminado para WhatsApp
    const mensaje = encodeURIComponent(
      `¡Hola! Estoy interesado en comprar: ${producto.nombre}  $${producto.precio.toFixed(2)}.`
    );
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;

    // Crear la tarjeta del producto
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toFixed(2)}</p>
      <a href="${urlWhatsApp}" target="_blank" class="btn-whatsapp">
        Pedir por WhatsApp
      </a>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", cargarCatalogo);
