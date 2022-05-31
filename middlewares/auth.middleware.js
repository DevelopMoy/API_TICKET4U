const jsonwebtoken = require('jsonwebtoken');

const isAdmin = async (req,res,next)=>{
    try{
        const {jwt} = req.body;
        if (!jwt){
            return res.status(401).json({
                ok: false,
                msg: "Not token provided"
            });
        }else {
            jsonwebtoken.verify(jwt,process.env.JWT_PASS,(err,decoded)=>{
                if (err){
                    return res.status(401).json({
                        ok: false,
                        msg: "Not authorized"
                    });
                }else {
                    const role=decoded.role;
                    if (role=="ADMIN"){
                        next();
                    }else{
                        return res.status(401).json({
                            ok: false,
                            msg: "Not authorized"
                        });
                    }
                }
            });
        }
    }catch (error){
        return res.status(500).json({
            ok: false,
            msg: "Not authorized or error at databse: "+error
        });
    }
}

module.exports = {
    isAdmin
}