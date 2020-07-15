

//ESTE ARCHIVO NO SE USA EN EL PROYECTO
//ES LA INTEGRACION CON SUPERSASS DESDE EL SIGNUP

var supersaas = require('supersaas-api-client');
var Client = supersaas.Client;
//var bcrypt = require("bcryptjs");

Client.configure({
    accountName: 'PruebaReserva_Edu',
    api_key: 'nIPUGJYNS2wnc61h4weP7g',
    host: 'https://www.supersaas.com/', //preguntar si es necesaria la bd mongo
});


/*exports.body = {
    "full_name":"pepe",
    "name": "78966567K",
    "email":"e@e.com",
    "password":"ala"
}*/

var prefix = ["E", "F", "Y", "B"];
/*
USO DE ROLES
user: 3
superuser: 4
blocked: -1
*/

async function createUser(req) {
    return await prefix.map(value => {//for
        return {
            full_name: req.body.username + " " + req.body.apellidos,
            name: value + req.body.dni.toUpperCase(),
            email: req.body.email,
            password: req.body.password,
            role: 3
        };
    })
}

exports.signup = async (req, res) => {
    const users = await createUser(req);
    //compruebo que existe
    let finalUser = await users.map(value => {
        return new Promise((resolve, reject) => {

            Client.Instance.users.get(value.name, (err, data) => {
                if (err) {
                    console.log(err);
                    if (err.errors[0].status == "404") {
                        //Todo ok! usuario no registrado y no ha usado la app
                        resolve(value);
                    } else {
                        //error en la llamada
                        reject(err);
                    }
                } else{
                    if (data.role !== -1) {
                        //error xq el usuario ya esta registrado
                        reject("Usuario ya está registrado")
                    }else{
                        //Todo ok, pero user ha usado la app
                        data.role= 3;
                        data.password= value.password;
                        data.email= value.email;
                        data.full_name= value.full_name;
                        data.modified=true;
                        resolve(data);
                    }                    
                }
            })
        })
    })

    //dspues de las 4 promesas(finalUser), se ejecuta esto
    Promise.all(finalUser)
    .then(async data=>{
        let error;
        await data.map(value=>{
            if(value.modified){//user not registered
                Client.Instance.users.update(value.name, value, null, (err,data)=>{
                    if(err){
                        error= err;
                        console.log(error)
                        //res.status(400).send({ message: "Error creando usuario desde not registered!"});
                    }
                }) 

            }else{//new user
                Client.Instance.users.create(value, value.name, null, (err,data)=>{
                    if(err){
                        error=err;
                        console.log(error);
                        console.log(value.email);
                        
                    }
                }) 
            }
        })
        if(error){ 
            res.status(400).send({ message: "Error creando usuario!"});
        }else{
        res.send({ message: "User was registered successfully!" });
        }
    })
    .catch(err=>{
        res.status(400).send({ message: err });
    })

}


exports.signin = (req, res) => { //PROBLEMA: no podemos acceder a la contraseña de user / no existe funcion de auth en supersaas (login)
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // en 24h expira el token
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
  };











//node - let a = require('./controllers/authSass.controller.js') - a.signup({"body":a.body})
