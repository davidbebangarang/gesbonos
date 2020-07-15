const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//crea un nuevo usuario en la BD (rol=user si no se especifica otro)
exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    lastname: req.body.lastname,
    dni: req.body.dni,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "Usuario registrado con éxito!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "Usuario registrado con éxito!" });
      });
    }
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//busca username, compara passwords --> genera token y lo devuelve
exports.signin = (req, res) => {
  User.findOne({
    where: {
      dni: req.body.dni
    }
  })
    .then(user => {
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
        expiresIn: 1800 //30m      24 hours=86400
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          lastname: user.lastname,
          email: user.email,
          dni: user.dni,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};