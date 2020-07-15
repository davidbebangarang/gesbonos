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

router.post('/', (req,res)=>{
    console.log("request:");
    console.log(req.body.idInstance);
    console.log(req.server);
    controller.consultabonos(req.body.userId,req.body.idInstance)
    .then(data=>{
        console.log("response:"+data);
        response.success(req,res,data,200);
    })
    .catch(err=>response.error(req,res,err,500));
});

router.get('/:instanceId/:userId', (req,res)=>{
    controller.consultabonos(req.params.userId,req.params.instanceId)
    .then(data=>{
        console.log(data);
        response.success(req,res,data,200);
    })
    .catch(err=>response.error(req,res,err,500));
});
//patch actualiza
router.patch('/', (req,res)=>{
   
    controller.consumeBono(req.body.userId,req.body.actividad)
    .then(data=>response.success(req,res,data,200))
    .catch(err=>response.error(req,res,err,500));
});

module.exports=router;