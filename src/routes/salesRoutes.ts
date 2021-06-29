import { Router, Request, Response } from 'express';
import { registerSales } from '../controllers/registerSales';

const router = Router();

//explorar las ventas
// router.get('/sales', (req: Request, res: Response) => {
//     Sales.find({status: "Disponible"},(err, salesDoc) => {
//         if (err) {
//             console.error(err);
//         }
//         return res.status(200).json({
//             sales: salesDoc
//         });
//     });
// });

router.post('/sales/register', registerSales);

export default router;