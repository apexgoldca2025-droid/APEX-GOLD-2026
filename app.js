const NUMERO_WHATSAPP = "584126012186"; 

const productos = [
  {
    id: 1,
    nombre: "Camiseta Algodón",
    precio: 15.00,
    imagen: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    nombre: "Zapatos Deportivos",
    precio: 45.00,
    imagen: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    nombre: "Gorra Camuflada",
    precio: 23.00,
    imagen: "IMG_20261005_164952_452.jpg" // Tu imagen subida a GitHub
  }
];

function cargarCatalogo() {
  const contenedor = document.getElementById("catalogo");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const mensaje = encodeURIComponent(
      `¡Hola! Estoy interesado en comprar ${producto.nombre} por $${producto.precio.toFixed(2)}.`
    );
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;

    const card = document.createElement("div");
    card.classList.add("card");
    
    // Agregamos el onclick="abrirModal(...)" en la imagen
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" onclick="abrirModal('${producto.imagen}', '${producto.nombre}')">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toFixed(2)}</p>
      <a href="${urlWhatsApp}" target="_blank" class="btn-whatsapp">
        Pedir por WhatsApp
      </a>
    `;

    contenedor.appendChild(card);
  });
}

// Funciones del Modal (Ventana Emergente)
function abrirModal(urlImagen, nombreProducto) {
  const modal = document.getElementById("modalImagen");
  const imgModal = document.getElementById("modalImg");
  const tituloModal = document.getElementById("modalTitulo");

  if (modal && imgModal) {
    imgModal.src = urlImagen;
    if (tituloModal) tituloModal.textContent = nombreProducto;
    modal.classList.add("activo");
  }
}

function cerrarModal() {
  const modal = document.getElementById("modalImagen");
  if (modal) modal.classList.remove("activo");
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

document.addEventListener("DOMContentLoaded", cargarCatalogo);
