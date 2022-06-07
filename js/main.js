// Futuro carrito de compras


function producto() {
    let listado = prompt("¿Qué producto quiere llevar?: \n 1- Jabon $10 \n 2- Crema $20 \n 3- Peine $30")
    switch (listado) {
        case "1":
            let cantidad = prompt("¿Cuántos Jabones queres llevar?")
            let precio = alert("El total a abonar es de $" + cantidad * 10);
            break;
        case "2":
            let cantidad1 = prompt("¿Cuántas cremas queres llevar?")
            let precio1 = alert("El total a abonar es de $" + cantidad1 * 20);
            break;
        case "3":
            let cantidad2 = prompt("¿Cuántos peines queres llevar?")
            let precio2 = alert("El total a abonar es de $" + cantidad2 * 30);
            break;
    }
}

producto();

console.log("Gracias por tu compra");