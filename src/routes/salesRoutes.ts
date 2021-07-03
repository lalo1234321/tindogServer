import { Router, Request, Response } from 'express';
import { validateJWT } from '../middleware/validateJWT';
import { registerSales, getAllSales, deleteSales, makePurchase} from '../controllers/registerSales';

const router = Router();

router.post('/sales/register', registerSales);
router.get('/sales/confirmation');
router.get('/getAllSales', [validateJWT], getAllSales);
router.put('/deleteSales/:saleId', [validateJWT], deleteSales);
router.put('/makePurchase/:saleId', [validateJWT], makePurchase);

export default router;