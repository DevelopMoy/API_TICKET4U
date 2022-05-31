const express = require('express');
const userRoutes = require('../routes/user.routes');
const lugarRouter = require('../routes/lugar.routes');
const {dbConnection} = require("../database/config");

class MainServer {
    userEndpoint = "/user";
    lugarEndpoint = "/lugar";

    constructor(port) {
        this.port = port;
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.assignRoutes();
        this.app.listen(port,()=>{console.log("Listening at "+port)});
    }

    async conectarDB(){
        await dbConnection();
    }
    
    middlewares(){
        this.app.use(express.json());
        // Configurar cabeceras y cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    assignRoutes(){
        this.app.use(this.userEndpoint,userRoutes);
        this.app.use(this.lugarEndpoint,lugarRouter);
    }
}


module.exports = MainServer;