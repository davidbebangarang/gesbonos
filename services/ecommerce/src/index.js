const cors = require("cors");
const express = require("express");
const expressip = require('express-ip');
const morgan = require('morgan');
const db = require('./db');
const config = require('./config');
const logger = require ('./utils/logger');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const path = require('path');


const app = express();
//permisos
app.use(cors());


app.use(express.json());

app.use(fileUpload())

//conexion BD
//db(config.dbUrl);

//Inporte de rutas
const  indexRout = require ('./routes/index.js');

//Ajustes
app.set('port', config.port);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public')));//Directorio para archivos staticos
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

//Rutas
app.use('/ecommerce',indexRout);

//Inicio del servidor
app.listen(app.get('port'),()=>{
  logger.info(`Server on port ${app.get('port')}`);
});