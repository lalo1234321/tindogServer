import { Router } from "express";
import { putTopic, getAllTopics } from "../controllers/chatTopicController";

const router = Router();

router.post('/chat/topic/register', putTopic);
router.get('/chat/topic/getAll', getAllTopics);

export default router;