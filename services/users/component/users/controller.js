const store=require('./store');
let {idPrefixes,serviHost,serviPort}=require('../../config');

///GET LA INFO DE LOS BONOS
const consultabonos= async (userId,instanceId)=>{
    if(instanceId){
        console.log("aquí1");
        console.log(`http://${serviHost}:${serviPort}/bonos/classes/${instanceId}`);
        idPrefixes=await store.getPrefixes(instanceId);
        console.log("prefijos",idPrefixes);
    }
    console.log("aquí2");
    return Promise.all(idPrefixes.map(async item => {
        console.log(item+userId);
        let value =await store.getBonos(item+userId);
        let bono={};
        bono[item]=value;
        return bono;
    }))
}

///CONSUMIR LOS BONOS

const consumeBono=async (userId,actividad)=>{
    let user=actividad+userId;
    await store.consumeBono(user);
    return consultabonos(userId);
}

module.exports={consultabonos,consumeBono};