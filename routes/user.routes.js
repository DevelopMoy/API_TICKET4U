const express = require('express');
const helpersMdw = require('../middlewares/helpers.middleware');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/user.controller');
const authMdw = require('../middlewares/auth.middleware');

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
    authMdw.isAdmin,
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

module.exports = router;