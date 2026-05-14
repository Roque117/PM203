const readline = require('readline');
const listaPedidos = [];
let total = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

Productos = [
    { nombre: "Cafe", precio: 6 },
    { nombre: "Galleta", precio: 7 },
    { nombre: "Chocolaate", precio: 8 },
    { nombre: "Capucino", precio: 9 },
    { nombre: "Agua", precio: 5 }
];

function agregarPedido(producto) {
    listaPedidos.push(producto);
    total += producto.precio;

    console.log(`\nProducto "${producto.nombre}" agregado correctamente.`);
    console.log(`\n\nTotal actual:\n ${total}\n\n`);
    
    iniciarMenu();
}

function mostrarResumen() {
    console.log("\nCaja");
    if (listaPedidos.length === 0) {
        console.log("(Vacio)");
    } else {
        listaPedidos.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nombre} - $${p.precio}`);
        });
    }
    console.log(`\n\ntotal:\n ${total}\n\n`);
    iniciarMenu();
}

function iniciarMenu() {
    console.log("Opciones: \n1.-Agregar Producto \n2.-Ver lista de Pedidos \n3.-Salir\n");
    rl.question('Selecciona una opción: ', (opcion) => {
        if (opcion === '1') {
            console.log("\nProductos:\n1.-Cafe a $6\n2.-Galleta a $7\n3.-Chocolaate a $8\n4.-Capucino a $9\n5.-Agua a $5\n");
            rl.question('Seleccionar producto: ', (numero) => {
                const seleccion = Productos[parseInt(numero) - 1];
                if (seleccion) {
                    agregarPedido(seleccion);
                } else {
                    console.log("Producto no encontrado.");
                    iniciarMenu();
                }
            });
        } else if (opcion === '2') {
            mostrarResumen();
        } else if (opcion === '3') {
            console.log("Adios");
            rl.close();
        } else {
            console.log("Opción no válida.");
            iniciarMenu();
        }
    });
}

console.log("Modulo Caja");
iniciarMenu();

