import { Router, Request, Response } from 'express';
const router = Router();
import User from '../models/userModel';
import Pet from '../models/petModel';
const { validarJWT } = require('../middleware/validateJwt');
import { check } from 'express-validator';
import {register}  from '../controllers/user';
const { validarCampos, validarEdad } = require('../middleware/validateFields');
import {confirmation} from '../controllers/confirmation';

const userController = { 
    register: register
};


router.post('/user', async(req, res) => {
    let body = req.body;
    try{
        const user = new User(body);
        await user.save();
        res.status(200).json({
            msg: "usuario guardado",
            user
        });
    } catch(err) {
        res.status(500).json({
            err
        });
    }
    

}); 

router.get('/user', (req, res) => {
    let query = User.find().populate('ownedPets')
    query.exec((err, userDoc) => { 
        res.json({
            result: userDoc
        })
    })
})
router.get('/match',[validarJWT] ,(req,res)  => {
    res.status(200).json({
        msg:"esta ruta está protegida"
    })
});

router.post('/register',[
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

router.get('/confirmation/:token', confirmation);
export default router;