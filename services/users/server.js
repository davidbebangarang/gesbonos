const express = require("express");
const bodyParser = require("body-parser");//necesario para crear un req.body
const cors = require("cors");//incluido ya en express
const router = require('./network/routes');

const app = express(); 

var corsOptions = {
  origin: "http://localhost:3000" //8081
};


app.use(cors());
// permite recibir json y archivos grandes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//BD
const db = require("./models");
const { Router } = require("express");
const Role = db.role;
//Para production, db.sequelize.sync(); e insertar roles manualmente
/*db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});*/
db.sequelize.sync({ force: false , alter : true });
initial();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
}

// RUTAS

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
router(app);

// PUERTO
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});