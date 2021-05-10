import { Router, Request, Response } from 'express';
import { registerPet, retrievePetImage } from "../controllers/petController";
import { validatePetBodyFields } from "../middleware/validateBodyFields"; 
import { validatePetFormData, validateUploadedFiles } from "../middleware/validateMediaFields"; 

const router = Router(); 
router.post('/pet', validatePetFormData, validatePetBodyFields, validateUploadedFiles, registerPet);
router.get('/pet', retrievePetImage);

export default router;