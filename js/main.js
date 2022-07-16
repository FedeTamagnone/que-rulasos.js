// Primera Entrega DOOM + Eventos
/* const carritoFinal = []

function producto() {
    let listado = prompt("¿Qué producto quiere llevar?: \n 1- Jabon $10 \n 2- Crema $20 \n 3- Peine $30")
    switch (listado) {
        case "1":
            let cantidad = prompt("¿Cuántos Jabones queres llevar?")
            let precio = (cantidad * 10)
            const carrito = {
                producto: "Jabón",
                cantidad: cantidad,
                total: precio
            }
            carritoFinal.push(carrito)

            break;

        case "2":
            let cantidad1 = prompt("¿Cuántas cremas queres llevar?")
            let precio1 = (cantidad1 * 20);

            const carrito1 = {
                producto: "Crema",
                cantidad: cantidad1,
                total: precio1
            }
            carritoFinal.push(carrito1)
            break;

        case "3":
            let cantidad2 = prompt("¿Cuántos peines queres llevar?")
            let precio2 = (cantidad2 * 30);

            const carrito2 = {
                producto: "Peine",
                cantidad: cantidad2,
                total: precio2
            }
            carritoFinal.push(carrito2)
            break;
    }
    let agregarListado=prompt("¿Querés agregar otro producto SI/NO?")
    if (agregarListado == "si"){
        return producto();
    } else {
        console.log(carritoFinal);
    }
}

//producto()

const precioFinal = carritoFinal.reduce( (acc, item) =>{
    return acc += item.total;
}, 0)

console.log("El total a abonar es de $" + precioFinal + "\nGracias por su compra"); */


//variable que irá almacenando las compras en un array
let carritoDeCompras = []
//Variables globales

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const finCompra = document.getElementById('fin-compra')
const precioTotal = document.getElementById('precioTotal');
const buscarTipo = document.getElementById('buscarTipo')
const botonTerminar = document.getElementById('terminar')
const datos = "./js/datos.json"
//const stockProductos = JSON.stringify ()




//filtro de productos por su TIPO
buscarTipo.addEventListener('change', () => {

    if (buscarTipo.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        let arrayNuevo = stockProductos.filter(item => item.tipo == buscarTipo.value) //array nuevo
        mostrarProductos(arrayNuevo)
    }
})

//mostrarProductos(stockProductos)

const mostrarProductos = async () => {
    contenedorProductos.innerHTML = "" // Vacía html para mostrar solo los array filtrados
    const respuesta = await fetch(datos)
    const productos = await respuesta.json()
    productos.forEach((el) => {
    //for (const el of array) {
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
    })
}
mostrarProductos()

//const stockProductos = JSON.parse(datos)

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
    } else {
        let productoAgregar = stockProductos.find(el => el.id === id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar) //con eso pusheo al producto que seleccione con id al carrito
        actualizarCarrito()
        Carrito(productoAgregar)
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
                <button id="eliminar${id}"> Restar producto </button>`
    contenedorCarrito.appendChild(div)
    localStorage.setItem('datosCarrito', JSON.stringify(carritoDeCompras));

    /*     let carritoLocal = localStorage.getItem(JSON.parse("datosCarrito"));
        div.innerText = carritoLocal; */

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
}


/* --------------------- Multiplica precio por cantidad --------------------- */
function actualizarCarrito() {
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

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