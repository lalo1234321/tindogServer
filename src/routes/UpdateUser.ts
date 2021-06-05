import { Router } from 'express';
import { updateUser } from '../controllers/updateUser';

const router = Router();

router.put('/updateUser', updateUser);

export default router;