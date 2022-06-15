const express = require('express');
const helpersMdw = require('../middlewares/helpers.middleware');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/user.controller');
const authMdw = require('../middlewares/auth.middleware');
const { route } = require('express/lib/application');

router.post("/login",[
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
    helpersMdw.validateErrors
],controller.loginUser)

router.post("/new_customer",[
    check("nombre").not().isEmpty(),
    check("apellido").not().isEmpty(),
    check("username").not().isEmpty(),
    check("e_mail").not().isEmpty(),
    check("e_mail").isEmail(),
    check("password").notEmpty(),
    helpersMdw.validateErrors
],controller.createCliente);

router.post("/new_businessman",[
    check("nombre").not().isEmpty(),
    check("apellido").not().isEmpty(),
    check("username").not().isEmpty(),
    check("calle").not().isEmpty(),
    check("codigoPostal").not().isEmpty(),
    check("colonia").not().isEmpty(),
    check("ciudad").not().isEmpty(),
    check("estado").not().isEmpty(),
    check("e_mail").not().isEmpty(),
    check("e_mail").isEmail(),
    check("RFC").not().isEmpty(),
    check("password").notEmpty(),
    helpersMdw.validateErrors
],controller.createEmpresario);

router.post("/get_users",[
    check("jwt").not().isEmpty(),
    authMdw.isAdmin,
    helpersMdw.validateErrors
],controller.getUsers);

router.post("/get_single_user",[
    check("jwt").not().isEmpty(),
    check("uid_usr").not().isEmpty(),
    helpersMdw.validateErrors
],controller.get_single_user);

router.put("/edit_user",[
    check("jwt").not().isEmpty(),
    check("uid_user").not().isEmpty(),
    check("nombre").not().isEmpty(),
    check("apellido").not().isEmpty(),
    check("isCustomer").not().isEmpty(),
    authMdw.isAdmin,
    helpersMdw.validateErrors
],controller.editUser);

router.delete("/delete_user",[
    check("jwt").not().isEmpty(),
    check("uid_user").not().isEmpty(),
    check("status").not().isEmpty(),
    authMdw.isAdmin,
    helpersMdw.validateErrors
],controller.deleteUser);

router.post("/create_datoFact",[
    check("nombre").not().isEmpty(),
    check("regimenFiscal").not().isEmpty(),
    check("calle").not().isEmpty(),
    check("codigoPostal").not().isEmpty(),
    check("colonia").not().isEmpty(),
    check("ciudad").not().isEmpty(),
    check("estado").not().isEmpty(),
    check("RFC").not().isEmpty(),
    check("razonSocial").not().isEmpty(),
    check("owner_uid").not().isEmpty(),
    helpersMdw.validateErrors
],controller.create_datoFacturacion);

router.post("/get_datFact",[
    check("uid_usr").not().isEmpty(),
    helpersMdw.validateErrors
],controller.get_datosFact)

router.delete("/delete_datoFact",[
    check("uid_datoFact").not().isEmpty(),
    helpersMdw.validateErrors
],controller.deleteDatosFacturac);

router.post("/create_metodopago",[
    check("numeroTarjeta").not().isEmpty(),
    check("banco").not().isEmpty(),
    check("fechaVencimiento").not().isEmpty(),
    check("owner").not().isEmpty(),
    helpersMdw.validateErrors
],controller.createMetodoPago);

router.post("/get_metodospago",[
    check("uid_owner"),
    helpersMdw.validateErrors
],controller.getMetodosPago);

router.delete("/delete_metodopago",[
    check("uid_MetodoPago").not().isEmpty(),
    helpersMdw.validateErrors
],controller.deleteMetodoPago);

router.post("/create_asiento",[
    check("seccion_uid").not().isEmpty(),
    check("owner_uid").not().isEmpty(),
    check("metodoPago_uid").not().isEmpty(),
    check("datoFacturacion_uid").not().isEmpty(),
    helpersMdw.validateErrors
],controller.create_asiento)

module.exports = router;