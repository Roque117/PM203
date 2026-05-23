

function mostrarCaja() {
    console.log("TICKET DE COMPRA: ");

    for (let i = 0; i < listaPedidos.length; i++) {
        let elemento = listaPedidos[i];
        
        const { producto, precio } = elemento; 
        
        console.log(producto + " - $" + precio);
    }
 
    let subtotal = listaPedidos.reduce(function (acumulador, elemento) {
        return acumulador + elemento.precio;
    }, 0);

    let iva = subtotal * 0.16;
    let total = subtotal + iva;

    console.log("Subtotal: $" + subtotal);
    console.log("IVA: $" + iva);
    console.log("Total: $" + total);
}