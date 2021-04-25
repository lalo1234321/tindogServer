import { Router, Request, Response } from 'express';
import User from '../models/userModel'; 
import * as bcrypt from 'bcrypt';
import { IUser } from "../interfaces/IUser";



const router = Router();


router.post('/login', async(req, res) => {
    let passwordBody = req.body.password;
    
    
    // let password2 = query.get('password');
    
    try {
        const user:IUser = await User.findOne({email: req.body.email});
        if( !user ) {
            return res.status(400).json({
                msg:"Usuario no encontrado"
            });
        }
        const validPassword = await bcrypt.compare(passwordBody, user.password);
        if( !validPassword ) {
            return res.status(400).json({
                msg:'Las credenciales no coinciden'
            });
        }
        res.status(200).json({
            user
        });

    } catch( err ) {
        return res.status(500).json({
            msg:'Ocurrió un error, hablé con el administrador!'
        });
    }


    //bcrypt.compare(req.body.password, user.password);
    //bcrypt.compare();
    // password = await bcrypt.compare(password, user.password);
    // if(!password) {
    //     return res.json({
    //         msg: "algo salio mal"
    //     });
    // }
});




export default router;






