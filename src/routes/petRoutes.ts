import { Router, Request, Response } from 'express';
import { acceptPetChat, createAcceptedModel, deletePetNotification, registerPet, retrieveChats, retrieveMessages, retrievePetImage, retrievePetNotifications } from "../controllers/petController";
import { validatePetBodyFields } from "../middleware/validateBodyFields"; 
import { validatePetFormData, validateUploadedFiles } from "../middleware/validateMediaFields"; 
import  { validateJWT }  from "../middleware/validateJWT";
import { validateOwner } from '../middleware/validateOwner';
import { match } from '../controllers/match'
import { petAgeValidator } from '../middleware/customChecks/customUserChecks';


const router = Router(); 
router.post('/pet', validateJWT,petAgeValidator, validatePetFormData, validatePetBodyFields, validateUploadedFiles, validateOwner, registerPet);
router.get('/pet/image/:kindOfImage/:petId', validateJWT, retrievePetImage);
router.get('/pet/match/:id', match);
router.get('/pet/notifications/:petUserName', validateJWT,retrievePetNotifications);
router.delete('/pet/notifications/:notificationId',validateJWT,deletePetNotification);
router.post('/pet/createAccepted/:idPet',createAcceptedModel);
router.put('/pet/accept/:idPet/:petUserName', acceptPetChat);
router.get('/pet/accept/:idPet',retrieveChats);
router.get('/pet/messages/:myPetUserName/:otherPetUsarName', retrieveMessages);

export default router;