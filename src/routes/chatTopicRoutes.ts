import { Router } from "express";
import { putTopic } from "../controllers/chatTopicController";

const router = Router();

router.post('/chat/topic/register', putTopic);
router.get('/chat/topic/getAll', );