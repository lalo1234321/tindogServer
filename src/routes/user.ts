import { Router } from 'express';
import { check } from 'express-validator';
import {register}  from '../controllers/user';
const router = Router();
const { validarCampos, validarEdad } = require('../middleware/validateFields');

const userController = { 
    register: register
};

export default router.post('/register',[
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
    check('lastName', 'El apellido es obligatorio').notEmpty(),
    validarCampos,
    check('userName', 'El nombre de usuario es obligatorio').notEmpty(),
    validarCampos,
    check('age', 'La edad es obligatoria').notEmpty(),
    validarCampos,
    check('state', 'El estado es obligatorio').notEmpty(),
    validarCampos,
    check('town', 'La ciudad es obligatoria').notEmpty(),
    validarCampos,
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    validarCampos,
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,
    check('email', 'Email no válido').isEmail(),
    validarCampos,
    validarEdad
], userController.register);


export {
    userController
};