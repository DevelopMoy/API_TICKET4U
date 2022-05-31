const {validationResult} = require('express-validator');

const checkDate = async (value)=>{
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!value.match(regEx)) throw new Error("Bad date format");  // Invalid format
    let d = new Date(value);
    let dNum = d.getTime();
    if(!dNum && dNum !== 0) throw new Error("Bad date format"); // NaN value, Invalid date
    return d.toISOString().slice(0,10) === value;
}

const validateErrors =async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(
            errors
        )
    }else{
        next();
    }
}

module.exports = {
    checkDate,
    validateErrors
}