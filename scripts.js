let carrito = {};
let totalCarrito = 0;

function agregarAlCarrito(nombreProducto, precio) {
    if (carrito[nombreProducto]) {
        carrito[nombreProducto].cantidad++;
    } else {
        carrito[nombreProducto] = { cantidad: 1, precio: precio };
    }

    actualizarCarrito();
}

function eliminarProducto(nombreProducto) {
    if (carrito[nombreProducto].cantidad > 1) {
        carrito[nombreProducto].cantidad--;
    } else {
        delete carrito[nombreProducto];
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    totalCarrito = 0;
    for (let producto in carrito) {
        totalCarrito += carrito[producto].cantidad * carrito[producto].precio;
    }

    let carritoCantidad = document.getElementById("carritoCantidad");
    let totalProductos = Object.values(carrito).reduce((total, producto) => total + producto.cantidad, 0);
    carritoCantidad.innerText = `Carrito: ${totalProductos} Productos`;

    let listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = '';  

    for (let producto in carrito) {
        let li = document.createElement("li");
        li.className = "producto-carrito"; 

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.className = "boton-eliminar";
        
        eliminarBtn.onclick = function() {
            eliminarProducto(producto);
        };

        let contenedorProducto = document.createElement("div");
        contenedorProducto.className = "contenedor-producto";

        contenedorProducto.appendChild(eliminarBtn);
        contenedorProducto.appendChild(document.createTextNode(`${producto} (Cantidad: ${carrito[producto].cantidad}) - Precio: $ ${carrito[producto].precio * carrito[producto].cantidad}`));

        li.appendChild(contenedorProducto);
        listaCarrito.appendChild(li);
    }

    let totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.innerText = `Total: $ ${totalCarrito}`;
}

function mostrarCarrito() {
    document.getElementById("detalle-carrito").classList.remove("oculto");
}

function cerrarCarrito() {
    document.getElementById("detalle-carrito").classList.add("oculto");
}

document.getElementById('mensaje-form').addEventListener('submit', function(event) {
    setTimeout(() => {
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('mensaje').value = '';
    }, 500); 
});

document.getElementById('reseña-form').addEventListener('submit', function(event) {
    setTimeout(() => {
        document.getElementById('tunombre').value = '';
        document.getElementById('calificacion').value = '';
        document.getElementById('comentario').value = '';
        document.getElementById('reseña-form').scrollIntoView({ behavior: 'smooth' });
    }, 500); 
});


document.getElementById("reseña-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("tunombre").value.trim();
    const calificacion = document.getElementById("calificacion").value;
    const comentario = document.getElementById("comentario").value.trim();

    if (!nombre || !calificacion || !comentario) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevaReseña = document.createElement("div");
    nuevaReseña.classList.add("reseña");

    nuevaReseña.innerHTML = `
        <h3>${nombre}</h3>
        <p>${"⭐".repeat(calificacion)}</p>
        <cite>${comentario}</cite>
    `;

    const contenedorReseñas = document.getElementById("contenedor-reseñas");
    contenedorReseñas.appendChild(nuevaReseña);

    document.getElementById("reseña-form").reset();
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            
            const productosContenedor = document.getElementById("productos-contenedor");
            const detalleContenedor = document.getElementById("det-productos-contenedor");

            data.forEach(producto => {

                const productoDiv = document.createElement("div");
                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <h3>${producto.titulo}</h3>
                    <a href="#${producto.id}">Detalle del Producto</a>
                `;
                productosContenedor.appendChild(productoDiv);

                const detalleDiv = document.createElement("div");
                detalleDiv.id = producto.id;
                detalleDiv.innerHTML = `
                    <div class="producto">
                    <h3>${producto.titulo}</h3>
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="contenedor-botones-det">
                        <button id='volver-det' class="boton-volver" onclick="window.history.back()" title='Volver'>Volver</button>
                    </div>
                    </div>
                    <div class="det-producto">
                    <ul class="listado">
                        ${producto.detalle.map(det => `
                            <li>
                                <img src="imagen/pez.png" alt="Ícono" class="icono">
                                ${det}
                            </li>
                        `).join("")}
                        <br>
                        <div class="boton-texto">
                            <button class="boton-carrito" onclick="agregarAlCarrito('${producto.titulo}', ${producto.precio})" title="Agregar al Carrito">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <li><span>Precio del Producto </span> &nbsp;$&nbsp; <a>${producto.precio}</a></li>
                        </div>

                    </ul>
                    
                    </div>
                    
                `;
                detalleContenedor.appendChild(detalleDiv);
            });
        })
        .catch(error => console.error("Error cargando los productos:", error));
});

const navItems = document.querySelectorAll('.nav-class li');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const audioFile = item.getAttribute('data-audio');
        if (audioFile) {
            const audio = new Audio(audioFile);
            audio.play();
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0; 
            }, 5000); 
        }
    });
});

    