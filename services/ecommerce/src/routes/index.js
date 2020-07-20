const express = require('express');
const bonos = require('../models/bono');
const router = express.Router();
const { v4: uuid } = require('uuid');
const logger = require('../utils/logger');
const config = require('../config');
const http = require('follow-redirects').http;
const controller = require('../controller');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

const app = express();


async function instanceDataFunction(idInstancia){
  var options = {
    'method': 'GET',
    'hostname': config.serviHostname,
    'port': config.serviPort,
    'path': `/bonos/config/${idInstancia}/`,
    'headers': {
    },
    'maxRedirects': 20
  };

  return new Promise ((resolve, reject)=>{
    var req = http.request(options, function (resp) {
    var chunks = [];

    resp.on("data", function (chunk) {
      chunks.push(chunk);
    });

    resp.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var bodyJson = JSON.parse(body);
      resolve(bodyJson.body);
    });

    resp.on("error", function (error) {
      console.error(error);
      reject(error);
    });
  });
  req.end();
});
}


//ruta para la public key de pago
router.get('/instanceData/:idInstancia', async(req, res) => {

  let instanceData = await instanceDataFunction(req.params.idInstancia);

  res.json(instanceData.publicKeyStripe);

})


//ruta para recogida de datos de pago
router.get('/customers/:idInstancia/:email', async (req, res) => {

  let instanceData = await instanceDataFunction(req.params.idInstancia);

  let email1 = req.params.email;
  console.log(instanceData.secretKeyStripe);
  var stripe = require('stripe')(instanceData.secretKeyStripe);
  
  var response = [];
  //filtrado de cliente por email que viene por instancia
  stripe.customers.list(
    {
      limit: 100,
      email: email1
    },
    async function (err, customers) {

      for (var i = 0; i < customers.data.length; i++) {
        //console.log("idCompra " + (i + 1) + ": " + customers.data[i].id);
        /*listado FACTURAS por email
        stripe.invoices.list ( 
          {customer: customers.data[i].id},
          function(err, invoices) {
            for(var j=0; j<invoices.data.length;j++){
<<<<<<< HEAD
              console.log(
                invoices.data[j].description,
                formattedDate,
                invoices.data[j].total
                );
              
            }
          }
        );
        //fin listado facturas x id  */
        //listado de CARGOS por email
        await stripe.charges.list(
          { customer: customers.data[i].id },
          function (err, charges) {
            for (var j = 0; j < charges.data.length; j++) {
              //convertir Date
              var myDate = new Date(charges.data[j].created * 1000);
              var year = myDate.getFullYear();
              var month = myDate.getMonth() + 1;
              if (month < 10) {
                month = "0" + month;
              }
              var date = myDate.getDate();
              if (date < 10) {
                date = "0" + date;
              }
              var formattedDate = date + "/" + month + "/" + year;
              var descripcion = charges.data[j].description;
              var precio = charges.data[j].amount;
              var fecha = formattedDate;
              console.log(charges.data[j].payment_method_details.card.last4)
              var tarjeta = charges.data[j].payment_method_details.card.last4;
              var estado = charges.data[j].status;
              //fin convertir date
              //Comprobar fecha
              if (charges.data[j].created = null) {
                formattedDate = "Cargando fecha...";
              }
              //fin comprobar fecha
              //Comprobar estado
              if (estado === "succeeded"){
                estado = "Pago correcto";
              }else{
                estado = "Pago no realizado";
              }
              //fin comprobar estado
              console.log(
                descripcion,
                precio,
                fecha,
                tarjeta,
                estado
              );//*/
              response.push(
                {
                  descripcion,
                  precio,
                  fecha,
                  tarjeta,
                  estado
                }
              );
            }
          }
        );
        //fin listado de cargos por id
      }
      setTimeout(function () {
        res.json(response);
      }, 0);
    }
  );
  //*/fin filtrado clientes por email

})

router.post('/reserva/:idInstancia', async (req, res) => {

  let error;
  let status;

  try {

    let userData = {
      'name': req.body.name,
      'email': req.body.email,
      'role': -1
    }

    await controller.buyBono(req.params.idInstancia, req.body.bonoId, userData);
    status = "success";
  } catch (err) {
    status = "failure";
  }
  res.json({ error, status });
})


//ruta devuelve todos los bonos
router.get('/:idInstancia', async (req, res) => {

  console.log(req.params.idInstancia);

  var options = {
    'method': 'GET',
    'hostname': config.serviHostname,
    'port': config.serviPort,
    'path': `/bonos/${req.params.idInstancia}`,
    'headers': {
    },
    'maxRedirects': 20
  };

  var req = http.request(options, function (resp) {
    var chunks = [];

    resp.on("data", function (chunk) {
      chunks.push(chunk);
    });

    resp.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var bodyJson = JSON.parse(body);
      
      res.json(bodyJson.body);
    });

    resp.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
});

router.get('/:idInstancia/:idBono', async (req, res) => {

  var options = {
    'method': 'GET',
    'hostname': config.serviHostname,
    'port': config.serviPort,
    'path': `/bonos/${req.params.idInstancia}/${req.params.idBono}`,
    'headers': {
    },
    'maxRedirects': 20
  };

  var req = http.request(options, function (resp) {
    var chunks = [];

    resp.on("data", function (chunk) {
      chunks.push(chunk);
    });

    resp.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var bodyJson = JSON.parse(body);
      console.log(bodyJson.body.toString());
      res.json(bodyJson.body);
    });

    resp.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
});


//ruta compra 
router.post("/checkout/:idInstancia", async (req, res) => {

  let instanceData = await instanceDataFunction(req.params.idInstancia);
  
  
   
  console.log("Usando estos datos : " + instanceData.secretKeyStripe);
  const stripe = require('stripe')(instanceData.secretKeyStripe);

  let error;
  let status;

  try {

    await controller.buyBono(req.params.idInstancia, req.body.product.bonoId, req.body.product.userData);
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    logger.info("Charge:", { charge });
    status = "success";

  } catch (error) {

    logger.info("Error:", error);
    status = "failure";

    try {
      //variable.hola
      await controller.rollbackPurchase(req.params.idInstancia, req.body.product.bonoId, req.body.product.userData, { bono: true, user: true });

    } catch (err) {
      logger.info("Error:", err)
    }
  }
  res.json({ error, status });
});




module.exports = router;   