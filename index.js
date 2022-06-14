require('dotenv').config();
const MainServer = require('./models/MainServer');
const {Server} = require("socket.io");

let globalClient = 0;
const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("Nueva conexión realizada al server de sockets");
  // send a message to the client

    globalClient++;
    socket.emit("messages", "Gracias por tu preferencia, hay "+globalClient+" cliente(s) esperando por su boleto ahora");

    socket.on('disconnect', function () {
        console.log('Desconectado del cliente!!! ');
        globalClient--;
    });
});



const server = new MainServer(process.env.PORT);