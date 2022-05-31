const {Schema,model} = require("mongoose");

const LugarSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    estado: {
        type:String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports=model("lugar",LugarSchema);