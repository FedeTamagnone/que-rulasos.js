// Futuro carrito de compras


const carritoFinal = []

function producto() {
    let listado = prompt("¿Qué producto quiere llevar?: \n 1- Jabon $10 \n 2- Crema $20 \n 3- Peine $30")
    switch (listado) {
        case "1":
            let cantidad = prompt("¿Cuántos Jabones queres llevar?")
            let precio = (cantidad * 10)
            const carrito = [{
                Producto: "Jabón",
                Cantidad: cantidad,
                Total: "$" + precio
            }]
            carritoFinal.push(carrito)

            break;

        case "2":
            let cantidad1 = prompt("¿Cuántas cremas queres llevar?")
            let precio1 = (cantidad1 * 20);

            const carrito1 = [{
                Producto: "Crema",
                Cantidad: cantidad1,
                Total: "$" + precio1
            }]
            carritoFinal.push(carrito1)
            break;

        case "3":
            let cantidad2 = prompt("¿Cuántos peines queres llevar?")
            let precio2 = (cantidad2 * 30);

            const carrito2 = [{
                Producto: "Peine",
                Cantidad: cantidad2,
                Total: "$" + precio2
            }]
            carritoFinal.push(carrito2)
            break;
    }
}

producto()
console.log(carritoFinal);
producto()
console.log(carritoFinal);