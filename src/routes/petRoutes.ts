import { Router, Request, Response } from 'express';
import { registerPet, retrievePetImage } from "../controllers/petController";
import { validatePetBodyFields } from "../middleware/validateBodyFields"; 
import { validatePetFormData, validateUploadedFiles } from "../middleware/validateMediaFields"; 
import  { validateJWT }  from "../middleware/validateJWT";
import { validateOwner } from '../middleware/validateOwner';


const router = Router(); 
router.post('/pet', validateJWT, validatePetFormData, validatePetBodyFields, validateUploadedFiles, validateOwner, registerPet);
router.get('/pet/image/:kindOfImage/:petId', validateJWT, retrievePetImage);

export default router;