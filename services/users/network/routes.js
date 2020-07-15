express= require('express');

//recibe los mensajes del cliente
const users= require('../component/users/network');


//Aquí se añaden todas las rutas del servidor
const routes=(server)=>{
    server.use('/users',users);
}

module.exports = routes;