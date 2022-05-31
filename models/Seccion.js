const {Schema,model} = require("mongoose");

const SeccionSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    numAsientos: {
        type: Number,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    },
    uid_lugar: {
        type: String,
        required: true
    },
    uid_owner: {
        type: String,
        required: true
    }
});

module.exports=model("seccion",SeccionSchema);