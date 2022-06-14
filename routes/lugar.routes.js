const express = require('express');
const helpersMdw = require('../middlewares/helpers.middleware');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/lugar.controller');
const authMdw = require('../middlewares/auth.middleware');
/*
router.post("/list",[
    check("jwt").not().isEmpty(),
    helpersMdw.validateErrors
],controller.getAllUsers);

router.post("",[
    check('birthDate').not().isEmpty(),
    check('birthDate').custom(helpersMdw.checkDate),
    helpersMdw.validateErrors
],controller.createUser);
*/
router.post("/get_eventos",[
    check("uidOrganizador").not().isEmpty(),
    check("statusFilter").not().isEmpty(),
    helpersMdw.validateErrors
],controller.get_eventos)

router.post("/create_lugar",[
    check("nombre").not().isEmpty(),
    check("ciudad").not().isEmpty(),
    check("calle").not().isEmpty(),
    check("estado").not().isEmpty(),
    authMdw.isAdmin,
    helpersMdw.validateErrors
],controller.create_lugar);

router.get("/get_lugares",[
],controller.get_lugares)

router.post("/create_seccion",[
    check("nombre").not().isEmpty(),
    check("numAsientos").not().isEmpty(),
    check("precioUnitario").not().isEmpty(),
    check("uid_evento").not().isEmpty(),
    helpersMdw.validateErrors
],controller.create_seccion);

router.post("/create_evento",[
    check("nombreEvento").not().isEmpty(),
    check("organizador_jwt").not().isEmpty(),
    check("fecha").not().isEmpty(),
    helpersMdw.validateErrors
],controller.create_evento);

router.put("/edit_evento",[
    check("uid_evento").not().isEmpty(),
    check("nombreEvento").not().isEmpty(),
    check("lugarEvento").not().isEmpty(),
    check("organizador_jwt").not().isEmpty(),
    check("fecha").not().isEmpty(),
    helpersMdw.validateErrors
],controller.edit_evento)

module.exports = router;