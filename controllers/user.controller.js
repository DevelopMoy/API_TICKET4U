const jwt = require('jsonwebtoken');
const Usuario = require("../models/User");
const DatoFacturacion = require("../models/DatoFacturacion");
const bcrypt = require("bcryptjs");
const { body } = require('express-validator');
const MetodoPago = require("../models/MetodoPago");

const createCliente = async(req,res)=>{
    const {nombre,apellido,username,e_mail,password}=req.body;

    try{
        const newUser = new Usuario({
            nombre,
            apellido,
            mail: e_mail,
            password: await bcrypt.hash(password,10),
            rol: "CUSTOMER",
            userName:username,
            status: true
        });
        newUser.save((error,userNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "User created succesfully",
                    uid: userNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating user, please veriffy "+error,
                    error: true
                })
            }
       });

      
    }catch(errorDB ){
        console.log("Error at creating costumer");
        return res.status(400).json({
            msg: "Error at creating user, please veriffy "+errorDB,
            error: true
        })
    }  
}

const loginUser = async(req,res)=>{
    const {username,password}=req.body;

    try{
        const findedUser = await Usuario.findOne({userName:username}).exec();
        if(findedUser){
            const isValid = await bcrypt.compare(password,findedUser.password);
            console.log(isValid);
            if (isValid && findedUser.status){
                return res.status(200).json({
                    ok: true,
                    msg: "Logging in succesfull",
                    jwt: jwt.sign({ role: findedUser.rol, uid_usr: findedUser._id }, process.env.JWT_PASS),
                    role: findedUser.rol,
                    uid_ust: findedUser._id
                });
            }else{
                return res.status(400).json({
                    error: true,
                    msg: "Bad user or password, please retry"
                });
            }
        }else{
            return res.status(400).json({
                error: true,
                msg: "Bad user pr password, please retry"
            });
        }
    }catch(error){
        return res.status(400).json({
            error: true,
            msg: "Error at loggin in, please veriffy data "+error
        });
    }


}

const createEmpresario = async(req,res)=>{
    const {nombre,apellido,username,e_mail,password,calle,codigoPostal,colonia,ciudad,estado,RFC}=req.body;

    try{
        const newUser = new Usuario({
            nombre,
            apellido,
            mail: e_mail,
            password: await bcrypt.hash(password,10),
            rol: "BUSINESS",
            userName:username,
            calle,
            codigoPostal,
            colonia,
            ciudad,
            estado,
            RFC,
            status: false
        });
        newUser.save((error,userNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "User created succesfully",
                    uid: userNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating user, please veriffy "+error,
                    error: true
                })
            }
       });

      
    }catch(errorDB ){
        console.log("Error at creating costumer");
        return res.status(400).json({
            msg: "Error at creating user, please veriffy "+errorDB,
            error: true
        });
    }
   
}

const getUsers = async(req,res)=>{
    try{
        return res.status(200).json({
            ok:true,
            usersList: await Usuario.find({})
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving users, please veriffy "+error,
            error: true
        })
    }

}

const editUser = async (req,res)=>{
    const {uid_user,nombre,apellido,isCustomer,calle,codigoPostal,colonia,ciudad,estado,RFC} = req.body;

    try{
        if (isCustomer){
            // FOR CUSTOMERS
            const succesfull = await Usuario.findOneAndUpdate({_id:uid_user},{nombre,apellido});
            if (succesfull){
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

        }else {
            if (calle && codigoPostal && colonia && ciudad && estado && RFC){
                // FOR BUSINESS USERS
                const succesfullQuery = await Usuario.findOneAndUpdate({_id:uid_user},{nombre,apellido,calle,codigoPostal,colonia,ciudad,estado,RFC});
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

            }else{
                return res.status(500).json({
                    error: true,
                    msg: "INCOMPLETE DATA, PLEASE VERIFFY AND REQUEST AGAIN"
                });
            }
        }
    }catch(error){
        return res.status(500).json({
            error: true,
            msg: "Internal error: "+error
        });
    }
}

const deleteUser = async (req,res)=>{
    const {uid_user,status} = req.body;

    try{
        const succesfullQuery = await Usuario.findOneAndUpdate({_id:uid_user},{status});
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

const get_single_user = async(req,res)=>{
    const {uid_usr} = req.body;
    try{
        const usersList = await Usuario.findOne({_id:uid_usr});
        if (usersList){
            return res.status(200).json({
                ok:true,
                user: usersList
            });
        }else{
            return res.status(400).json({
                ok:false,
                msg: "User not found"
            });
        }
      
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving user, please veriffy "+error,
            error: true
        })
    }

}

const create_datoFacturacion = async(req,res)=>{
    const {nombre,regimenFiscal,calle,codigoPostal,colonia,ciudad,estado,RFC,razonSocial,owner_uid} = req.body;

    try{
        const newDatoFacturacion = new DatoFacturacion({
            nombre,
            regimenFiscal,
            calle,
            codigoPostal,
            colonia,
            ciudad,
            estado,
            RFC,
            razonSocial,
            owner_uid,
            status: true
        });
        newDatoFacturacion.save((error,datoNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "Dato facturacion created succesfully",
                    uid: datoNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating dato facturacion, please veriffy "+error,
                    error: true
                })
            }
       });

      
    }catch(errorDB ){
        console.log("Error at creating dato facturacion");
        return res.status(400).json({
            msg: "Error at creating dato facturacion , please veriffy "+errorDB,
            error: true
        })
    }  
}

const get_datosFact = async(req,res)=>{
    const {uid_usr} = req.body;
    try{
        const datoFactList = await DatoFacturacion.find({owner_uid:uid_usr});
        if (datoFactList){
            return res.status(200).json({
                ok:true,
                datos_fact: datoFactList
            });
        }else{
            return res.status(400).json({
                ok:false,
                msg: "User not found"
            });
        }
      
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving dato fact, please veriffy "+error,
            error: true
        })
    }

}

const deleteDatosFacturac = async (req,res)=>{
    const {uid_datoFact} = req.body;

    try{
        const succesfullQuery = await DatoFacturacion.findOneAndUpdate({_id:uid_datoFact},{status:false});
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

const createMetodoPago = async(req,res)=>{
    const {banco,numeroTarjeta,fechaVencimiento,owner} = req.body;

    try{
        const newMetodoPago = new MetodoPago({
            banco,numeroTarjeta,fechaVencimiento,owner, status: true
        });
        newMetodoPago.save((error,datoNw)=>{
            if (!error){
                return res.status(200).json({
                    msg: "Metodo pago created succesfully",
                    uid: datoNw.id
                   });
            }else{
                return res.status(400).json({
                    msg: "Error at creating metodo pago, please veriffy "+error,
                    error: true
                })
            }
       });
      
    }catch(errorDB ){
        console.log("Error at creating metodo pago");
        return res.status(400).json({
            msg: "Error at creating metodo pago , please veriffy "+errorDB,
            error: true
        })
    }  
}

const getMetodosPago = async(req,res)=>{
    const {uid_owner} = req.body;

    try{
        const metodosPagoList = await MetodoPago.find({owner:uid_owner,status: true});
        if (metodosPagoList){
            return res.status(200).json({
                ok:true,
                metodPago: metodosPagoList
            });
        }else{
            return res.status(400).json({
                ok:false,
                msg: "User not found"
            });
        }
      
    }catch(error){
        return res.status(500).json({
            msg: "Error at retreaving metodos pago, please veriffy "+error,
            error: true
        })
    }
}

module.exports = {
    createCliente,
    createEmpresario,
    loginUser,
    getUsers,
    editUser,
    deleteUser,
    get_single_user,
    create_datoFacturacion,
    get_datosFact,
    deleteDatosFacturac,
    createMetodoPago,
    getMetodosPago
}