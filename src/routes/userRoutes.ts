import { Router } from 'express'; import {
    registerUser, getAllPetsOwnedByUser, updatePassword,
    updateState, updateTown, getInformationConnection, savingSessionData,
    degrade
} from "../controllers/userController";
import { confirmation } from '../controllers/confirmation';
import { validateJWT } from '../middleware/validateJWT';
import { upgrade1 } from '../controllers/upgrade';
import { validateUserBodyFields } from '../middleware/validateBodyFields';

const router = Router();

router.get('/user', validateJWT, getAllPetsOwnedByUser);
router.get('/getInformationConnection', [validateJWT], getInformationConnection);
router.post('/register', validateUserBodyFields, registerUser);
router.put('/updatePassword', [validateJWT], updatePassword);
router.put('/updateState', [validateJWT], updateState);
router.put('/updateTown', [validateJWT], updateTown);
router.post('/savingSessionData', [validateJWT], savingSessionData);
router.get('/confirmation/:token', confirmation);
router.put('/upgrade', upgrade1);
router.put('/degrade',[validateJWT],degrade);

export default router;