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


let carritoDeCompras = []
//Variables globales

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const buscarTipo = document.getElementById('buscarTipo')
const buscador = document.getElementById('search')



//filtro
buscarTipo.addEventListener('change', () => {

    if (buscarTipo.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        let arrayNuevo = stockProductos.filter(item => item.tipo == buscarTipo.value) //array nuevo

        mostrarProductos(arrayNuevo)
    }
})

//Buscado

mostrarProductos(stockProductos)

//logica Ecommerce
function mostrarProductos(array) {
// Vacía html para mostrar solo los array filtrados
    contenedorProductos.innerHTML = ""

    for (const el of array) {
// sino tambien puedo usar 
//array.forEach( el => {
/* ------------------------------ Creando card ------------------------------ */
        let div = document.createElement('div')
/* --------------------------- asigno class al div -------------------------- */
        div.className = 'producto'

        div.innerHTML = ` <div class="card">
                                <div class="card-imagen">
                                    <img src="${el.img}">
                                    <br>
                                    <p class="card-titulo">${el.nombre}</p>
                                    <button id="boton${el.id}"> Agregar </button>
                                </div>
                                <div class="card-contenido">
                                    <p>${el.desc}</p>
                                    <p class="precio"> $ ${el.precio}</p>
                                </div>
                            </div>`
//Agrego card en el html con append
        contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`boton${el.id}`)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(el.id);
        })
    }
}


// uso id, para seleccionar puntualmente producto
// find busca un solo elemento
function agregarAlCarrito(id) {
    //repite se fija si se repite id
    let repite = carritoDeCompras.find(el => el.id == id)

    if (repite) {
        repite.cantidad = repite.cantidad + 1 //creo una propiedad, cantidad. 
        document.getElementById(`cantidad${repite.id}`).innerHTML = `<p id="cantidad${repite.id}">cantidad: ${repite.cantidad}</p>`
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(ele => ele.id === id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar) //con eso push al producto que seleccione con id al carrito
        actualizarCarrito()
        mostrarCarrito(productoAgregar)
    }

}



function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `<p>${productoAgregar.nombre}</p>
                <p>Precio: $${productoAgregar.precio}</p>
                <p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>
                <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

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




function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}