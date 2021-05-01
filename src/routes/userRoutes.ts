import { Router, Request, Response } from 'express';
const router = Router();
import User from '../models/userModel';
import Pet from '../models/petModel';
const { validarJWT } = require('../middleware/validateJwt');

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

export default router;