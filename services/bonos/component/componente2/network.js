const express = require('express');
//Definición de la respuesta al cliente
const response=require('../../network/response');
//controlador de mensajes
const controller=require('./controller');
//Datos globales del servidor
const global=require('../../config');
//añadir las rutas
const router=express.Router();

/*router.<get|post|put|patch|delete...>(ruta dentro del componente,(req,res)=>{
    //hacer lo correspondiente para la ruta generalmente llamar a funciones del controller
    //dar unarespuesta a través de response
});*/