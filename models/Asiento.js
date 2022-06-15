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
    }
});

module.exports=model("asiento",AsientoSchema);