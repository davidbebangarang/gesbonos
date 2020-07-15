//Añadir la conexión a la base de datos en caso de ser sql
//Añadir model.js si la conexión es de mongodb
const http=require('http')
var supersaas = require('supersaas-api-client');
var Client = supersaas.Client;
const {serviHost,serviPort}=require('../../config');

Client.configure({
    accountName: 'FisioProyectos',
    api_key: 'IPS9I_s_mDRLmVGhcb-PKg',
    host: 'https://www.supersaas.com/',
    //envia datos de la conexion x consola
    verbose: false
});


const getBonos=item=>{
    console.log(item);
    return new Promise((resolve,reject)=>{
        Client.Instance.users.get(item,(err,data)=>{
            if(err){
                //console.log("Ha hubido un error en el get: "+err);
                resolve('0');
            }
            else{
                console.log("todo correcto: ");
                console.log(data.credit); 
                resolve(data.credit||'0');
            }
            
        });
    });
}

const consumeBono=(user)=>{
    return new Promise((resolve,reject)=>{
        Client.Instance.users.get(user,(err,data)=>{
            if(err){
                //console.log("Ha hubido un error en el get: "+err);
                reject("usuario no registrado");
            }
            else{
                if(data.credit && data.credit>0){
                    Client.Instance.users.update(user,{credit:data.credit-1},null,err=>{
                        if(err)
                            reject(err);
                        else
                            resolve({'message':'Bono consumido','credit':data.credit-1});
                    });
                }
                else{
                    reject("usuario sin bonos");
                }
            }
            
        });
    });
}

const getPrefixes=async (instanceId)=>{
    console.log(`http://${serviHost}:${serviPort}/bonos/classes/${instanceId}`);
    var options = {
    "method": "GET",
    "hostname": serviHost,
    "port": serviPort,
    "path": "/bonos/classes/"+instanceId,
    "headers": {
        "content-type": "application/json",
        "content-length": "0"
    }
    };
    return new Promise((resolve,reject)=>{
        let req = http.request(options, function (res) {
            let chunks = [];
        
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            res.on("end", function () {
                let body = Buffer.concat(chunks);
                //console.log(body.toString());
                let bodyJson = JSON.parse(body);
                if(!bodyJson){
                    return reject ('error en la conexion');
                  }
                  if(bodyJson.error!=''){
                    console.log(bodyJson.error);
                      return reject(bodyJson.error)
                  }
                  resolve(bodyJson.body);
            });

            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
        });
        
        req.end();
    }) 
}

module.exports={getBonos,consumeBono,getPrefixes};