import { Router, Request, Response } from 'express';
import { ISales } from '../interfaces/ISales';
import Sales from '../mongoose-models/SalesModel';
import User from '../mongoose-models/userModel';
import Pet from "../mongoose-models/petModel";
import { validateJWT } from '../middleware/validateJWT';
import { registerSales, getAllSales, deleteSales, makePurchase} from '../controllers/registerSales';

const router = Router();

router.post('/sales/register', registerSales);
router.get('/sales/confirmation');
router.get('/getAllSales', [validateJWT], getAllSales);
router.put('/deleteSales/:saleId', [validateJWT], deleteSales);
router.put('/makePurchase/:saleId', [validateJWT], makePurchase);

export default router;