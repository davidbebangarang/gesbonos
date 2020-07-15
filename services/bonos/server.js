//para la aplicación web
const express = require('express');
const app=express();
const path=require('path');
const {host,port}=require('./config');
//crear servidor
const server=require('http').Server(app);

//todas las rutas de la página
const router=require('./network/routes');

//Poder recibir mensaje
const bodyParser=require('body-parser');

const cors=require('cors');

app.set('port',port);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public/'));
app.use(bodyParser.json());
app.use(cors());
app.use(function(res,req,next){  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//Aquí se añaden todas las rutas de la página
router(app);

//iniciar el servidor
server.listen(port,function(){
    console.log(`La aplicación esta escuchando en ${host}:${port}`);
});
