import { Router } from 'express'; import { registerUser, getAllPetsOwnedByUser, updatePassword, updateState, updateTown, getAuxLastConnection } from "../controllers/userController";
import { confirmation } from '../controllers/confirmation';
import { validateJWT } from '../middleware/validateJWT';
import { upgrade1 } from '../controllers/upgrade';
import { validateUserBodyFields } from '../middleware/validateBodyFields';

const router = Router();

router.get('/user', validateJWT, getAllPetsOwnedByUser)
router.get('/getAuxLastConnection', [validateJWT], getAuxLastConnection)
router.post('/register', validateUserBodyFields, registerUser);
router.put('/updatePassword', [validateJWT], updatePassword);
router.put('/updateState', [validateJWT], updateState);
router.put('/updateTown', [validateJWT], updateTown);
router.get('/confirmation/:token', confirmation);
router.put('/upgrade', upgrade1)
export default router;