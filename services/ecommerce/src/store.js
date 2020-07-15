//Añadir la conexión a la base de datos en caso de ser sql
//Añadir model.js si la conexión es de mongodb
const config=require('./config');
var supersaas = require('supersaas-api-client');
var Client = supersaas.Client;
const http = require('follow-redirects').http;

Client.configure({
    accountName: 'FisioProyectos',
    api_key: 'IPS9I_s_mDRLmVGhcb-PKg',
    host: 'https://www.supersaas.com/',
    verbose: false
});

const getBono=(instanceId,bonoId)=>{
  return new Promise((resolve,reject)=>{
    console.log(`Petición a ${config.serviHostname}:${config.serviPort}/${instanceId}/${bonoId}`);
    var options = {
      'method': 'GET',
      'hostname': config.serviHostname,
      'port': config.serviPort,
      'path': `/bonos/${instanceId}/${bonoId}`,
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
        if(!bodyJson){
          return reject ('error en la conexion');
        }
        if(bodyJson.error!=''){
          console.log(bodyJson.error);
            return reject(bodyJson.error)
        }
        resolve(bodyJson.body);
      });
    
      resp.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });
    req.end();
  })
}

const updateBono=async (instanceId,bonoId,bono)=>{
  return new Promise((resolve,reject)=>{
    console.log(`Petición a ${config.serviHostname}:${config.serviPort}/${instanceId}/${bonoId}`);
    var options = {
      'method': 'PATCH',
      'hostname': config.serviHostname,
      'port': config.serviPort,
      'path': `/bonos/${instanceId}/${bonoId}`,
      "headers": {
        "content-type": "application/json",
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

        if(bodyJson.error!=''){
            return reject(bono.error)
        }
        resolve(bodyJson.body);
      });
    
      resp.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });
    req.write(JSON.stringify({"idBono":bonoId,bono}));
    req.end();
  })
}

const getUsuario=(user,classBono)=>{
  item=classBono+user;
  console.log(item);
  return new Promise((resolve,reject)=>{
      Client.Instance.users.get(item,(err,data)=>{
          if(err){
              //console.log("Ha hubido un error en el get: "+err);
              resolve('-1');
          }
          else{
              console.log("todo correcto: ");
              console.log(data); 
              resolve(data);
          }          
      });
  });
}

const createUser=(userData)=>{
  return new Promise((resolve,reject)=>{
    console.log(userData);
    Client.Instance.users.create(userData,userData.name,null,err=>{
        if(err)
            reject(err);
        else
            resolve({'message':'Usuario creado','status':'200'});
    });
  });
}


const updateUser=(userData)=>{
  return new Promise((resolve,reject)=>{
    Client.Instance.users.update(userData.name,{credit:userData.credit},null,err=>{
        if(err)
            reject(err);
        else
            resolve({'message':'Usuario actualizado','status':'200'});
    });
  });
}


module.exports={getBono,updateBono,getUsuario,createUser,updateUser};