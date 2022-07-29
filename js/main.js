/* ---------- variable que irá almacenando las compras en un array ---------- */
let carritoDeCompras = JSON.parse(localStorage.getItem('datos')) || []

/* --------------------------- Variables globales --------------------------- */
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const finCompra = document.getElementById('fin-compra')
const precioTotal = document.getElementById('precioTotal');
const buscarTipo = document.getElementById('buscarTipo')
const botonTerminar = document.getElementById('terminar')
const buscador = document.getElementById('buscador')
const btnBuscar = document.getElementById('btnBuscar')
const barra = document.getElementById('barra')

const datos = "./js/datos.json"
//const stockProductos = JSON.stringify ()


/* ------------------------- Fn que filtra productos ------------------------ */

buscarTipo.addEventListener('change', () => {
    if (buscarTipo.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        let arrayNuevo = stockProductos.filter(item => item.tipo == buscarTipo.value) //array nuevo
        mostrarProductos(arrayNuevo)
    }
})
mostrarProductos(stockProductos)


/* buscador.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let arrayNuevo = stockProductos.filter(item => item.tipo == buscador.value) //array nuevo
        mostrarProductos(arrayNuevo)
    } 
}) 
mostrarProductos(stockProductos) */

btnBuscar.addEventListener("click", () => {
    if (buscador.value == "") {
        mostrarProductos(stockProductos)
    } else {
        let arrayNuevo = stockProductos.filter(item => item.tipo == buscador.value) //array nuevo
        mostrarProductos(arrayNuevo)
        buscador.value = ""
    }
})
mostrarProductos(stockProductos)


/* ------------------------ Fn crea card de porductos ----------------------- */
function mostrarProductos(array) {
    contenedorProductos.innerHTML = "" // Vacía html para mostrar solo los array filtrados
    for (const el of array) {
        //Desestructuro el
        let {
            nombre,
            img,
            id,
            desc,
            precio
        } = el

        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML = ` <div class="card">
                                <div class="card-imagen">
                                    <img src="${img}">
                                    <br>
                                    <p class="card-titulo">${nombre}</p>
                                    <button id="boton${id}"> Agregar </button>
                                </div>
                                <div class="card-contenido">
                                    <p>${desc}</p>
                                    <p class="precio"> $ ${precio}</p>
                                </div>
                            </div>`

        /* -------------------- Agrego card en el html con appendChild ------------------- */
        contenedorProductos.appendChild(div)

        /* -------------------------- clic en boton agregar ------------------------- */
        let btnAgregar = document.getElementById(`boton${el.id}`)
        btnAgregar.addEventListener('click', () => {
            Toastify({
                text: "Agregado a carrito",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "black",
                },
                onClick: function () {} // Callback after click
            }).showToast();
            agregarAlCarrito(el.id);
        })
    }

}




// uso id, para seleccionar puntualmente producto
// find busca un solo elemento
function agregarAlCarrito(id) {
    //Si agrega el mismo producto se acumula por el ID y no se agrega como producto nuevo 
    let repite = carritoDeCompras.find(el => el.id == id)
    if (repite) {
        repite.cantidad = repite.cantidad + 1
        document.getElementById(`cantidad${repite.id}`).innerHTML = `<p id="cantidad${repite.id}"> cantidad: ${repite.cantidad}</p>`
        actualizarCarrito()
        carritoDeCompras.push(repite)
        localStorage.setItem('datos', JSON.stringify(carritoDeCompras))

    } else {
        let productoAgregar = stockProductos.find(el => el.id === id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar) //con eso pusheo al producto que seleccione con id al carrito
        actualizarCarrito()
        Carrito(productoAgregar)

        /* ---------------------------- almaceno en localStorage --------------------------- */
        localStorage.setItem('datos', JSON.stringify(carritoDeCompras))
    }
}





/* -------------------- Agrega HTML productos al carrito -------------------- */
function Carrito(productoAgregar) {
    let div = document.createElement('div')
    let {
        nombre,
        precio,
        id,
        cantidad
    } = productoAgregar
    div.classList.add('producto-carrito')
    div.innerHTML = `<p> Producto: ${nombre}</p>
                <p>Precio: $${precio}</p>
                <p id="cantidad${id}" class="cantidades"> Cantidad: ${cantidad}</p>
                <button class ="botonEliminar" id="eliminar${id}"> - </button>
                <button class ="botonEliminar" id="sumar${id}"> + </button>`
    contenedorCarrito.appendChild(div)



    //Funcion Eliminar: si cantidad es igual a 1 elimina producto, si candidad no es 1 resta productos
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click', () => {
        if (productoAgregar.cantidad == 1) {
            btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(item => item.id !== productoAgregar.id)
            actualizarCarrito()
        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>`
            actualizarCarrito()
        }
    })

    let btnSumar = document.getElementById(`sumar${productoAgregar.id}`)
    btnSumar.addEventListener('click', () => {
        productoAgregar.cantidad = productoAgregar.cantidad + 1
        document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>`
        actualizarCarrito()
    })
}






/* --------------------- Multiplica precio por cantidad --------------------- */
function actualizarCarrito() {
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

/* function remover () {
    if (carritoDeCompras.length === 0) {
        botonTerminar.classList.add("d-none")
    } else {
        botonTerminar.classList.remove("d-none")
    }
}
remover() */

botonTerminar.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra',
        showConfirmButton: false,
        timer: 1500
    })
    contenedorCarrito.innerHTML = "";
    precioTotal.innerText = "0";
    localStorage.clear();
})