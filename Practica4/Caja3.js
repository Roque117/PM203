
// CALLBACK

const notificar = (mensaje, callback) => {

    estado.innerHTML = mensaje;

    callback();

};


const cancelarPedido = () => {

    pedidoCancelado = true;

    estado.innerHTML = `

        Pedido cancelado

        <br><br>

        Area: Caja

    `;

};