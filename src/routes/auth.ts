import { Router } from 'express';
import { login } from '../controllers/auth';
import { validateCredentials } from "../middleware/validateBodyFields";

const router = Router();

router.post('/login', validateCredentials, login);

export default router;






