import { Router, Request, Response } from 'express';
import { validateJWT } from '../middleware/validateJWT';
import {
    registerSales, getAllSales, deleteSales, makePurchase,
    getAllSalesByBreedsAndSpeciePet, getAllSalesByUser
} from '../controllers/registerSales';
import { validatePrice } from '../middleware/validateBodyFields';

const router = Router();

router.post('/sales/register', validatePrice, registerSales);
router.get('/sales/confirmation');
router.get('/getAllSales', [validateJWT], getAllSales);
router.get('/getAllSalesByUser', [validateJWT], getAllSalesByUser);
router.put('/getAllSalesByBreedsAndSpeciePet', [validateJWT], getAllSalesByBreedsAndSpeciePet);
router.put('/deleteSales', [validateJWT], deleteSales);
router.put('/makePurchase/:saleId', [validateJWT], makePurchase);

export default router;