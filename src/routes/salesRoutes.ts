import { Router, Request, Response } from 'express';
import { ISales } from '../interfaces/ISales';
import Sales from '../mongoose-models/SalesModel';

const router = Router();

//explorar las ventas
router.get('/sales', (req: Request, res: Response) => {
    Sales.find({status: "Disponible"},(err, salesDoc) => {
        if (err) {
            console.error(err);
        }
        console.log("SalesDoc:\n"+salesDoc);
    });
});

router.post('/sales/register', (req: Request, res: Response) => {
    let idSeller = req.body.id;
    //recibir un token y extraer la info del usuario
});

export default router;