const config={

    //dbUrl: process.env.DB_URL || "mongodb://localhost/basedatos2",
    //dbUrl: process.env.DB_URL || "mongodb+srv://christian:1111@cluster1-ae5o3.mongodb.net/test?retryWrites=true&w=majority",
    port:  process.env.PORT || 2000,
    host: process.env.HOST || 'http://localhost',
    serviHostname: process.env.serviHostname || "localhost",
    serviPort : process.env.serviPort || 8080
}

module.exports=config;