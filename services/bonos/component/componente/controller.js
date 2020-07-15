const store=require('./store');
const fs=require('fs');
const path=require('path');

///Añadir la funcionalidad necesaria para calcular las respuestas del servidor

///Añadir la funcionalidad necesaria para modelar los datos que se guardarán en la base de datos a través del store 

const getBonos=async (idInstancia)=>{
    
    let bonos= await new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../../public/'+idInstancia+'.json'),(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
    return JSON.parse(bonos);
}

const getClasses=async (idInstancia)=>{
    
    let bonos= await new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../../public/'+idInstancia+'_classes.json'),(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
    return JSON.parse(bonos);
}


const getInstance=async (idInstancia)=>{
    
    let instance= await new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../../public/instance.json'),(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
    return JSON.parse(instance).find(element=>
        element.id===idInstancia
    );
}


const getBono= async (idInstancia,idBono)=>{
    bonos=await getBonos(idInstancia);
    return await bonos.find(element=>element.idBono===idBono);
}

const createBono=async (idInstancia,newBono)=>{
    let bonos=await getBonos(idInstancia);
    if(bonos.length!==0){
        newBono.idBono=(1+parseInt(bonos[bonos.length -1].idBono,10)).toString();
    }
    else{
        newBono.idBono='1';
    }
    let classes=await getClasses(idInstancia);
    if(!classes.includes(newBono.classBono)){
        classes.push(newBono.classBono);
    }
    bonos.push(newBono);
    await saveChanges(idInstancia,bonos,classes);
    return bonos;
}

const updateBono=async (idInstancia,idBono, modifiedBono)=>{
    let bonos=await getBonos(idInstancia);
    let newBonos=await bonos.map((value,index)=>{
        if(value.idBono===idBono){
            return modifiedBono;
        }
        else{
            return value;
        }
    });
    let data=await Promise.all(newBonos);
    await saveChanges(idInstancia,data)
    return data;
}

const deleteBono=async (idInstancia,idBono)=>{
    let bonos= await getBonos(idInstancia);

    let i = await bonos.findIndex((value)=>value.idBono===idBono)
    if ( i !== -1 ) {
        bonos.splice(i,1);
    }
    await saveChanges(idInstancia,bonos);
    return bonos;
}

const saveChanges=async (idInstancia,newData,newClasses)=>{
    return await new Promise((resolve,reject)=>{
        fs.writeFile(path.join(__dirname,'../../public/'+idInstancia+'.json'),JSON.stringify(newData),'utf8',(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                if(newClasses){
                    fs.writeFile(path.join(__dirname,'../../public/'+idInstancia+'_classes.json'),JSON.stringify(newClasses),'utf8',(err,data)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve("guardado con éxito");
                        }
                    })
                }
                else{
                    resolve("guardado con éxito");
                }
            }
        })
    })
}
module.exports={
    getClasses,
    getBonos,
    getBono,
    createBono,
    updateBono,
    deleteBono,
    getInstance
}