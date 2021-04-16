import { Router, Request, Response } from 'express';
import Pet from "../models/petModel";
const router = Router();

router.post('/pet', (req: Request, res: Response) => {
    let body = req.body;     
    const pet = new Pet(body); 
    pet.save((err, petDoc) => {
        if(err) 
            return res.status(500).json(err);
        res.status(200)
            .json({
                message: 'Pet registered',
                petDoc
            })
    })
})
