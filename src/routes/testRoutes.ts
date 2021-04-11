import { Router, Request, Response } from 'express';
const router = Router();
import User from '../models/userModel';
import Pet from '../models/petModel';


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

router.post('/pet', (req: Request, res: Response) => {
    let body = req.body;     
    const pet = new Pet(body); 
    pet.save((err, petDoc) => {
        if(err) 
            return res.status(500).json(err);
        res.status(200)
            .json({
                message: 'Pet registered'
            })
    })
})

module.exports = router;