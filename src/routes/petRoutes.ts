import { Router, Request, Response } from 'express';
import { acceptPetChat, createAcceptedModel, deletePetNotification, registerPet, 
    retrieveChats, retrieveMessages, retrievePetImage, retrievePetNotifications, 
    updateAge, updateName, deletePet, updateProfileImage, updateMedicalCertificate,
    petValoration } from "../controllers/petController";
import { validatePetBodyFields } from "../middleware/validateBodyFields";
import { validatePetFormData, validateUploadedFiles } from "../middleware/validateMediaFields";
import { validateJWT } from "../middleware/validateJWT";
import { validateOwner } from '../middleware/validateOwner';
import { match } from '../controllers/match'
import { petAgeValidator } from '../middleware/customChecks/customUserChecks';
import * as path from 'path';
import multer from "multer";

//Config Storage Engine
const storage: multer.StorageEngine = multer.memoryStorage();

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../../serverStorage')
})

// import * as multer from 'multer';

// const upload = multer({ dest: '../public/' });


const router = Router();
router.post('/pet', validateJWT, petAgeValidator, validatePetFormData, validatePetBodyFields, validateUploadedFiles, validateOwner, registerPet);
router.get('/pet/image/:kindOfImage/:petId', validateJWT, retrievePetImage);
router.get('/pet/match/:id', match);
router.get('/pet/notifications/:petUserName', validateJWT, retrievePetNotifications);
router.delete('/pet/notifications/:notificationId', validateJWT, deletePetNotification);
router.post('/pet/createAccepted/:idPet', createAcceptedModel);
router.put('/pet/accept/:idPet/:petUserName', acceptPetChat);
router.get('/pet/accept/:idPet', retrieveChats);
router.get('/pet/messages/:myPetUserName/:otherPetUsarName', retrieveMessages);
router.put('/updateAge/:petId', [validateJWT], petAgeValidator, updateAge);
router.put('/updateName/:petId', [validateJWT], updateName);
router.put('/deletePet/:petId', [validateJWT], deletePet);
router.put('/pet/update/profilePicture/:petId', validateJWT, upload.single('profilePic'), updateProfileImage);
router.put('/pet/update/medicalCertificate/:petId', validateJWT, upload.single('certificate'), updateMedicalCertificate)
router.post('/pet/valoration', validateJWT, petValoration);

export default router;