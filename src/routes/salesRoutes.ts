import { Router, Request, Response } from 'express';
import { validateJWT } from '../middleware/validateJWT';
import { registerSales, getAllSales, deleteSales, makePurchase, getAllSalesByBreedsAndSpeciePet } from '../controllers/registerSales';
import { validatePrice } from '../middleware/validateBodyFields';

const router = Router();

router.post('/sales/register', validatePrice, registerSales);
router.get('/sales/confirmation');
router.get('/getAllSales', [validateJWT], getAllSales);
router.get('/getAllSalesByBreedsAndSpeciePet', [validateJWT], getAllSalesByBreedsAndSpeciePet);
router.put('/deleteSales/:saleId', [validateJWT], deleteSales);
router.put('/makePurchase/:saleId', [validateJWT], makePurchase);

export default router;