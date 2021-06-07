import {Request, Response} from 'express';
import IFile, {KindOfImage} from '../interfaces/IFile';
import Pet from "../models/petModel"; 
import { MulterFileOps } from "../utils/MulterFileOps";
import { Types } from 'mongoose';
const fileOps = new MulterFileOps();

export const registerPet = async (req: Request, res: Response) => { 
    if(fileOps.areAllFilesValid(req.files)) { 
        let listOfFilePaths = {};
        let file: IFile;
        const petId = new Types.ObjectId();
        for(let key in req.files) {
            let rawFile = req.files[`${key}`];
            file = fileOps.rearrangeFileStructure(rawFile);
            let extension = file.originalname.split('.')[1];
            let newFileName = `${petId}.${extension}`;  
            let filePath = fileOps.writeFile(file, newFileName);
            listOfFilePaths[`${key}`] = filePath;
        }
        const petDoc = new Pet({
            username: req.body.username,
            name: req.body.name,
            age: req.body.age,
            specie: req.body.specie,
            breed: req.body.breed,
            vaccines: req.body.vaccines,
            profileImage: listOfFilePaths[`${KindOfImage.PROFILE_IMAGE}`],
            medicalCertificateImage: listOfFilePaths[`${KindOfImage.MEDICAL_CERTIFICATE_IMAGE}`],
            owner: req.userId
        })
        try {
            await petDoc.save();
            return res.status(200).json({
                "message": "Pet registered",
                "petInfo": { 
                    "username": req.body.username,
                    "name": req.body.name,
                    "age": req.body.age,
                    "specie": req.body.specie,
                    "breed": req.body.breed,
                    "vaccines": req.body.vaccines,
                    "owner": req.body.owner
                } 
            })
        }catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }

    return res.status(400).json({
        message: 'Invalid extension, you should use JPG, JPEG or PNG'
    }) 
} 

export const retrievePetImage = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    const hostname= 'localhost:8080';
    const path = req.params.kindOfImage;

    Pet.findById(petId, (err, petDoc) => {
        if(err)
            return res.status(404).json({
                err: err.message
            })
        if(!petDoc)
            return res.status(404).json({
                message: 'The pet does not exist'
            })
        let pathTokes: string[];
        if(process.platform === 'win32')
            pathTokes = petDoc[`${path}`].split('\\');
        else
            pathTokes = petDoc[`${path}`].split('/');
        let fileName = pathTokes[pathTokes.length - 1];
        const imageURI = `${hostname}/${path}/${fileName}`;
        res.status(200).json({
            message: path == KindOfImage.PROFILE_IMAGE ? "Profile Image": "Medical Certificate Image",
            img: imageURI
        })
    })
}
