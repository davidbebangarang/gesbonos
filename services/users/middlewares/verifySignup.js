const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//aqui se verifica que no hay duplicidad de user y email
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //DNI
    User.findOne({
      where: {
        dni: req.body.dni
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! El DNI ya está registrado!"
        });
        return;
      }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! El Email ya está registrado!"
        });
        return;
      }

      next();
    });
  });
};


//tambien comprueba si el rol en la req es legal o no
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Error! Rol ${req.body.roles[i]} no existe!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted : checkRolesExisted
};

module.exports = verifySignUp;




/* CON MONGO
checkDuplicateUsernameOrEmail = (req, res, next) => {
  //DNI
  User.findOne({
    dni: req.body.dni
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! This DNI is already in use!" });
      return;
    }

  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
});
};


//tambien comprueba si el rol en la req es legal o no
checkRolesExisted = (req, res, next) => {
if (req.body.roles) {
  for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLES.includes(req.body.roles[i])) {
      res.status(400).send({
        message: `Failed! Role ${req.body.roles[i]} does not exist!`
      });
      return;
    }
  }
}

next();
};

const verifySignUp = {
checkDuplicateUsernameOrEmail,
checkRolesExisted
};

module.exports = verifySignUp;*/