const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const TaskSchema = new Schema({
    
  idBono: { type: String, required: true },
  titulo: { type: String, required: true },
  ubicacion: { type: String},
  valor: { type: String, required: true },
  precio: { type: String},
  tiempo: { type: String},
  textoAdicional: { type: String, required: true },
  descripcion: { type: String, required: true },
  condiciones: { type: String, required: true },
  imagenesTarjetas: { type: String, required: true },
  imagen: { type: Object, required: true },
  linkRedes: { type: String},  

});

module.exports=mongoose.model('bonos',TaskSchema);