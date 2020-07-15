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



router.put('/', (req,res)=>{
    controller.buyBono(req.body.instanceId,req.body.bonoId,req.body.userData)
    .then(data=> response.success(req,res,data.message,data.status))
    .catch(err=> response.error(req,res,err.message,err.status));
})

router.patch('/', (req,res)=>{
    controller.rollbackPurchase(req.body.instanceId,req.body.bonoId,req.body.userData,{bono:true,usuario:true})
    .then(data=> response.success(req,res,data.message,data.status))
    .catch(err=> response.error(req,res,err.message,err.status));
})

module.exports=router;