import { Router } from 'express'; import { registerUser, getAllUsersWithTheirPets, updatePassword, updateState, updateTown } from "../controllers/userController";
import {confirmation} from '../controllers/confirmation';
import { validateJWT } from '../middleware/validateJWT';

const router = Router();

router.get('/user', getAllUsersWithTheirPets)
router.post('/register', registerUser);
router.put('/updatePassword', [validateJWT], updatePassword);
router.put('/updateState', [validateJWT],  updateState);
router.put('/updateTown', [validateJWT], updateTown);

router.get('/confirmation/:token', confirmation);
export default router;