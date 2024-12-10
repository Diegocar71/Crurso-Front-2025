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

    let carritoValor = document.getElementById("carritoValor");
    let totalProductos = Object.values(carrito).reduce((total, producto) => total + producto.cantidad, 0);
    carritoValor.innerText = `Carrito: ${totalProductos} Productos`;

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
    