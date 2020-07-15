express= require('express');

//recibe los mensajes del cliente
const componente= require('../component/componente/network');
//const componente2= require('../component/componente2/network');


//Aquí se añaden todas las rutas del servidor
const routes=(server)=>{
    server.use('/bonos',componente);
    //server.use('ruta2',componente2);
}

module.exports = routes;