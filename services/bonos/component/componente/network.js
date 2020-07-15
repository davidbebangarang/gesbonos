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


router.get('/classes/:idInstancia',async (req,res)=>{
    controller.getClasses(req.params.idInstancia)
    .then(data=>{
        response.success(req,res,data,200);
    })
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    });

})


router.get('/:idInstancia',async (req,res)=>{
    controller.getBonos(req.params.idInstancia)
    .then(data=>{
        response.success(req,res,data,200);
    })
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    });

})

router.get('/config/:idInstancia',async (req,res)=>{
    controller.getInstance(req.params.idInstancia)
    .then(data=>{
        response.success(req,res,data,200);
    })
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    });

})


router.get('/:idInstancia/:idBono', async (req, res) => {
    controller.getBono(req.params.idInstancia,req.params.idBono)
    .then(data=> response.success(req,res,data,200))
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    });
});

router.post('/:idInstancia',async (req,res)=>{
    controller.createBono(req.params.idInstancia,req.body.bono)
    .then(data=>{
        console.log(req.body.bono,'body');
        response.success(req,res,data,201);
    })
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    })
})

router.patch('/:idInstancia/:idBono',async (req,res)=>{
    controller.updateBono(req.params.idInstancia,req.params.idBono,req.body.bono)
    .then(data=>{
        response.success(req,res,data,200);
    })
    .catch(err=>{
        response.error(req,res,err.message,err.status);
    })
})

router.delete('/:idInstancia/:idBono',async (req,res)=>{
    controller.deleteBono(req.params.idInstancia,req.params.idBono)
    .then(data=>{
        console.log("todo bien");
        response.success(req,res,data,200);
    })
    .catch(err=>{
        console.log("todo mal");
        response.error(req,res,err.message,err.status);
    })
})

module.exports=router;