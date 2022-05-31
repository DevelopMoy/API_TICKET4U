const mongoose = require("mongoose");

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_MONGOOSE,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a base de datos");
    }catch(error){
        console.log("Error al conectarse a la base de datos "+error);
        throw new Error("Error al conectarse a la base de datos");
    }
}

module.exports = {
    dbConnection
}