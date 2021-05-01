import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
const { validarCampos, validarEdad } = require('../middleware/validateFields');



const router = Router();

router.post('/login',[
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    validarCampos,
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,
    check('email', 'Email no válido').isEmail(),
    validarCampos,
], login);




export default router;






