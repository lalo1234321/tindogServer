import { Router, Request, Response } from 'express';
import { registerUser, getAllUsersWithTheirPets } from "../controllers/userController";

const router = Router();

router.get('/user', getAllUsersWithTheirPets)
router.post('/register', registerUser);

export default router;