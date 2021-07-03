import { Router } from 'express';
import { registerTerms, getTermsRegister } from "../controllers/terms";

const router = Router();

router.post('/registerTerms', registerTerms);
router.get('/getTermsRegister', getTermsRegister);

export default router;