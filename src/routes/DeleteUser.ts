import { Router, Request, Response } from 'express';
import { deleteUser } from '../controllers/deleteUser';

const router = Router();

router.put('/deleteUser', deleteUser);

export default router;