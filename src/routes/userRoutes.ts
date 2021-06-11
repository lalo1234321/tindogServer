import { Router } from 'express'; import { registerUser, getAllPetsOwnedByUser } from "../controllers/userController";
import {confirmation} from '../controllers/confirmation';
import { validateJWT } from '../middleware/validateJWT';
import { upgrade1 } from '../controllers/upgrade';

const router = Router();

router.get('/user', validateJWT, getAllPetsOwnedByUser)
router.post('/register', registerUser);

router.get('/confirmation/:token', confirmation);
router.put('/upgrade', upgrade1)
export default router;