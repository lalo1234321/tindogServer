import { Request, Response } from "express";
import * as path from 'path';
import multer from "multer";

//Config Storage Engine
const storage: multer.StorageEngine = multer.memoryStorage();

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../../serverStorage')
})
const validatePetFormData = upload.fields([ 
    {name: "username"},
    {name: "name"},
    {name: "age"},
    {name: "specie"},
    {name: "breed"},
    {name: "vaccines"},
    {name: "medicalCertificateImage"},
    {name: "profileImage"},
])

const validateUploadedFiles = (req: Request, res: Response, next) => {
    if(Object.entries(req.files).length !== 2) 
        return res.status(404).json({
            message: 'Please upload the Profile Image & Medical Certificate Image'
        })
    next();
}

export { 
    validatePetFormData,
    validateUploadedFiles
};
