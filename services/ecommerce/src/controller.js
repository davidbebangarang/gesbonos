const store=require('./store');

const buyBono=async (instanceId,bonoId,userData)=>{
    return new Promise((resolve,reject)=>{
        store.getBono(instanceId,bonoId)
        .then(async bono=>{
            if(parseInt(bono.remainingBonos,10) < 1){
                return reject({"status":"500","message":"No quedan bonos disponibles"})
            }
            bono.remainingBonos=(parseInt(bono.remainingBonos,10)-1).toString();
            //bono.boughtBonos=(parseInt(bono.boughtBonos,10)+1).toString();
            await store.updateBono(instanceId,bonoId,bono);
            let user=await store.getUsuario(userData.name,bono.classBono);
            let succeed;
            if(user==='-1'){
                userData.credit=bono.credit
                userData.name=bono.classBono+userData.name;
                succeed =await store.createUser(userData);
            }
            else{
                user.credit=(parseInt(user.credit,10)+parseInt(bono.credit,10)).toString();
                user.email=userData.email;
                succeed=await store.updateUser(user);
            }
            resolve(succeed)

        })
        .catch(err=>{
            console.log("error")
            console.log(err);
            reject({"status":"500","message":err})
        })
    })
}

const rollbackPurchase=async (instanceId,bonoId,userData,toRollback)=>{
    return new Promise((resolve,reject)=>{
        if(toRollback.bono){
            store.getBono(instanceId,bonoId)
            .then(async bono=>{
                bono.remainingBonos=(parseInt(bono.remainingBonos,10)+1).toString();
                //bono.boughtBonos=(parseInt(bono.boughtBonos,10)+1).toString();
                await store.updateBono(instanceId,bonoId,bono);
                if(toRollback.user){

                    let user=await store.getUsuario(userData.name,bono.classBono);
                    let succeed;
                    user.credit=(parseInt(user.credit,10)-parseInt(bono.credit,10)).toString();
                    user.email=userData.email;
                    succeed=await store.updateUser(user);
                    resolve(succeed);
                }
                resolve('rollback ok');

            })
            .catch(err=>{
                console.log("error")
                console.log(err);
                reject({"status":"500","message":err})
            })
        }
    })
}

const instanceData = async (instanceId)=>{
    return new Promise((resolve,reject)=>{

})
}
module.exports={buyBono,rollbackPurchase};