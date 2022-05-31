require('dotenv').config();
const MainServer = require('./models/MainServer');

const server = new MainServer(process.env.PORT);