import { Router, Request, Response } from 'express';
import User from '../models/userModel'; 
import * as bcrypt from 'bcrypt';
import { IUser } from "../interfaces/IUser";



const router = Router();


router.post('/login', async(req, res) => {
    let password1 = req.body.password;
    
    const user:IUser = await User.findOne({email: req.body.email});
    // let password2 = query.get('password');
    console.log(user.password);
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






