const {Schema,model} = require("mongoose");

const UserSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    calle:{
        type: String,
        required: false
    },
    codigoPostal:{
        type: String,
        requred: false
    },
    colonia: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        required: false
    },
    RFC: {
        type: String,
        required: false
    }
});

module.exports=model("usuario",UserSchema);