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
    const {nombre,numAsientos,precioUnitario,uid_evento} = req.body;

    try{
        const newSeccion = new Seccion({
            nombre,
            numAsientos,
            precioUnitario,
            uid_evento
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
            lugaresList: await Lugar.find({status:true})
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving lugares, please veriffy "+error,
            error: true
        })
    }
}

const get_eventos = async (req,res)=>{
    const {statusFilter,uidOrganizador} = req.body;

    let eventoQuery;
    let organizador_uid;
    if (statusFilter == "ALL"){
        if (uidOrganizador){
            jsonwebtoken.verify(uidOrganizador,process.env.JWT_PASS,(err,decoded)=>{
                if (err){
                    return res.status(401).json({
                        ok: false,
                        msg: "Not authorized or invalid JWT"
                    });
                }else {   
                    if (decoded.role=="BUSINESS"){
                        organizador_uid=decoded.uid_usr;    
                    }else{
                        return res.status(401).json({
                            ok: false,
                            msg: "Not authorized or invalid JWT"
                        });
                    }
                }
            });
            eventoQuery = {organizador_jwt:organizador_uid};
        }else{
            eventoQuery = {};
        }
    }else{
        if (uidOrganizador){
            eventoQuery = {organizador_jwt:uidOrganizador,status:statusFilter};
        }else{
            eventoQuery = {status:statusFilter};
        }
    }

    try{
        let eventosLista =(await Evento.find(eventoQuery));
        const secciones = await Seccion.find();

        return res.status(200).json({
            ok:true,
            eventosList: eventosLista.map(
                (evento)=>{
                    const eventoNew= Object.assign(evento,{seccionesLista:secciones.filter((sec)=>sec.uid_evento==evento._id)})
                    const regData = {...eventoNew}._doc;
                    const listaSecc = {...eventoNew}.seccionesLista;
                    regData.listaDeSecc = listaSecc;
                    return regData
                }
            )
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving eventos, please veriffy "+error,
            error: true
        })
    }

}

const edit_evento = async (req,res)=>{
    const {nombreEvento,lugarEvento,organizador_jwt,fecha,uid_evento} = req.body;
    try{
        const succesfull = await Evento.findOneAndUpdate({_id:uid_evento},{status:"ACTIVE",nombreEvento,lugarEvento,organizador_jwt,fecha});
        if (succesfull){
            return res.status(200).json({
                msg:"Succesfully updated",
                ok: true
            });
        }else{
            return res.status(400).json({
                msg: "Error at updating "+succesfull,
                ok: false
            });
        }
    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }

}

const get_secciones = async (req,res)=>{
    const {uid_evento} = req.body;

    try{
        return res.status(200).json({
            ok:true,
            seccionesList: await Seccion.find({uid_evento})
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving secciones, please veriffy "+error,
            error: true
        })
    }
}

const delete_seccion = async(req,res)=>{
    const {uid_seccion} = req.body;

    try{
        const succesfullQuery = await Seccion.findOneAndUpdate({_id:uid_seccion},{uid_evento:""});
        if (succesfullQuery){
            return res.status(200).json({
                msg:"Succesfully deleted",
                ok: true
            });
        }else{
            return res.status(400).json({
                msg: "Error at deleting",
                ok: false
            });
        }
    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }
}

const update_lugar = async (req,res)=>{
    const {nombre,ciudad,calle,estado,status,lugar_uid} = req.body;
    try{
        const succesfullQuery = await Lugar.findOneAndUpdate({_id:lugar_uid},{
            nombre,
            ciudad,
            calle,
            estado,
            status
        });
        if (succesfullQuery){
            return res.status(200).json({
                msg:"Succesfully updated",
                ok: true
            });
        }else{
            return res.status(400).json({
                msg: "Error at updating",
                ok: false
            });
        }
    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }
}

const get_single_lugar = async (req,res)=>{
    const {uid_lugar} = req.body;
    try{
        return res.status(200).json({
            ok:true,
            lugar: await Lugar.findOne({status:true, _id: uid_lugar})
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving lugar, please veriffy "+error,
            error: true
        })
    }
}

module.exports = {
    create_lugar,
    create_seccion,
    create_evento,
    get_lugares,
    get_eventos,
    edit_evento,
    get_secciones,
    delete_seccion,
    update_lugar,
    get_single_lugar
}