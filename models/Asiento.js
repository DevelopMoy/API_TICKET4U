const {Schema,model} = require("mongoose");

const AsientoSchema = Schema({
    seccion_uid: {
        type: String,
        required: true
    },
    owner_uid: {
        type: String,
        required: true
    },
    num_asiento: {
        type: Number,
        required: true
    },
    metodoPago_uid: {
        type: String,
        required: true
    },
    datoFacturacion_uid: {
        type: String,
        required: true
    }
});

module.exports=model("asiento",AsientoSchema);