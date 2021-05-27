import { Router, Request, Response } from 'express';
import { registerPet, retrievePetImage } from "../controllers/petController";
import { validatePetBodyFields } from "../middleware/validateBodyFields"; 
import { validatePetFormData, validateUploadedFiles } from "../middleware/validateMediaFields"; 
import { validateOwner } from '../middleware/validateOwner';

const router = Router(); 
router.post('/pet', validatePetFormData, validatePetBodyFields, validateUploadedFiles, validateOwner, registerPet);
router.get('/pet/image/:kindOfImage/:petId', retrievePetImage);

export default router;