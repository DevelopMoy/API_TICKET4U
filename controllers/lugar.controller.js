const Lugar = require("../models/Lugar");
const Seccion = require("../models/Seccion");
const Evento = require("../models/Evento");
const jsonwebtoken = require('jsonwebtoken');

const create_lugar = async (req,res)=>{
    const {nombre,ciudad,calle,estado} = req.body;

    try{
        const newLugar = new Lugar({
            nombre,
            ciudad,
            calle,
            estado,
            status: true
        });
        newLugar.save((error,lugarNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "Lugar created succesfully",
                    uid: lugarNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating Lugar, please veriffy "+error,
                    error: true
                });
            }
       });

    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }
}

const create_seccion = async (req,res)=>{
    const {nombre,numAsientos,precioUnitario,uid_lugar} = req.body;

    try{
        const newSeccion = new Seccion({
            nombre,
            numAsientos,
            precioUnitario,
            uid_lugar
        });
        newSeccion.save((error,seccionNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "Seccion created succesfully",
                    uid: seccionNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating Seccion, please veriffy "+error,
                    error: true
                });
            }
       });

    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }
}

const create_evento = async (req,res)=>{

    const {nombreEvento,lugarEvento,organizador_jwt,fecha} = req.body;
    let organizador_uid;

    jsonwebtoken.verify(organizador_jwt,process.env.JWT_PASS,(err,decoded)=>{
        if (err){
            return res.status(401).json({
                ok: false,
                msg: "Not authorized or invalid JWT"
            });
        }else {
            organizador_uid=decoded.uid_usr;
                
            try{
        
                const newEvento = new Evento({
                    nombreEvento,
                    lugarEvento,
                    organizador_jwt: organizador_uid,
                    fecha,
                    status: "PENDING"
                });
        
                newEvento.save((error,eventoNw)=>{
                    if (!error){
                        return res.status(200).json({
                            msg: "Evento created succesfully",
                            uid: eventoNw.id
                           });
                    }else{
                        return res.status(400).json({
                            msg: "Error at creating Evento, please veriffy "+error,
                            error: true
                        });
                    }
               });
        
            }catch(error){
                return res.status(500).json({
                    error: true,
                    msg: "Internal error: "+error
                });
            }

        }
    });

    
}

const get_lugares = async (req,res)=>{
    try{
        return res.status(200).json({
            ok:true,
            lugaresList: await Lugar.find({})
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving lugares, please veriffy "+error,
            error: true
        })
    }
}

const get_eventos = async (req,res)=>{
    const {statusFilter,evento_UID} = req.body;

    let eventoQuery = evento_UID ? {_id:evento_UID,status:statusFilter}:{status:statusFilter}


    try{
        return res.status(200).json({
            ok:true,
            eventosList: await Evento.find(eventoQuery)
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving eventos, please veriffy "+error,
            error: true
        })
    }

}

module.exports = {
    create_lugar,
    create_seccion,
    create_evento,
    get_lugares,
    get_eventos
}