import { Router } from 'express'; import { registerUser, getAllUsersWithTheirPets } from "../controllers/userController";
import {confirmation} from '../controllers/confirmation';

const router = Router();

router.get('/user', getAllUsersWithTheirPets)
router.post('/register', registerUser);

router.get('/confirmation/:token', confirmation);
export default router;