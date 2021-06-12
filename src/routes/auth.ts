import { Router } from 'express';
import { login, renewToken } from '../controllers/auth';
import { validateCredentials } from "../middleware/validateBodyFields";
import { validateJWT } from '../middleware/validateJWT';

const router = Router();

router.post('/login', validateCredentials, login);
router.post('/login/renew',validateJWT, renewToken);
export default router;






