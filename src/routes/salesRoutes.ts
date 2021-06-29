import { Router } from 'express';
import { registerSales } from '../controllers/registerSales';

const router = Router();

router.post('/sales/register', registerSales);
router.get('/sales/confirmation');

export default router;