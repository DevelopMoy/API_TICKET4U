const {Schema,model} = require("mongoose");

const MetodoPagoSchema = Schema({
    numeroTarjeta: {
        type: String,
        required: true
    },
    banco: {
        type: String,
        required: true
    },
    fechaVencimiento: {
        type: Date,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports=model("metodopago",MetodoPagoSchema);