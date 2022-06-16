// Futuro carrito de compras


const carritoFinal = []

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

producto()

const precioFinal = carritoFinal.reduce( (acc, item) =>{
    return acc += item.total;
}, 0)

console.log("El total a abonar es de $" + precioFinal);