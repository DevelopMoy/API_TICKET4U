const {Schema,model} = require("mongoose");

const DatoFacturacionSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    regimenFiscal: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: Number,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    RFC: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    owner_uid: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports=model("dato_facturacion",DatoFacturacionSchema);