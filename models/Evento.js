const {Schema,model} = require("mongoose");

const EventoSchema = Schema({
    nombreEvento: {
        type: String,
        required: true
    },
    lugarEvento: {
        type: String,
        required: false
    },
    organizador_jwt: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    }
});

module.exports=model("evento",EventoSchema);