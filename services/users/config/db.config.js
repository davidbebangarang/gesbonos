  module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "gesbonosbd",
    dialect: "mysql",
    pool: {
      max: 40, //conecciones a la vez
      min: 0,
      acquire: 30000, //tiempo que intenta conectar antes de lanzar error
      idle: 10000 //tiempo max en desplegar desocupado ("con pinzas..")
    }
  };