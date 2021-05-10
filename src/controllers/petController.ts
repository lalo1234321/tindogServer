import {Request, Response} from 'express';
import IFile from '../interfaces/IFile';
import * as path from "path";
import Pet from "../models/petModel"; 
import MulterFileOps from "../utils/MulterFileOps";
const fileOps = new MulterFileOps();

export const registerPet = (req: Request, res: Response) => { 
    if(fileOps.areAllFilesValid(req.files)) { 
        const setOfFilesLength = Object.entries(req.files).length;
        let file: IFile;
        for(let index = 0; index < setOfFilesLength; index++) {
            file = fileOps.getFileByIndex(index, req.files);//TODO Refactor code
            file.dirStorageOption = index;
            fileOps.writeFile(file);
        }
        const hostname = 'localhost:8080';
        const petDoc = new Pet({
            username: req.body.username,
            name: req.body.name,
            age: req.body.age,
            specie: req.body.specie,
            breed: req.body.breed,
            vaccines: req.body.vaccines,
            profileImagePath: path.join(hostname, 'profileImagePath', fileOps.getFileByIndex(0, req.files).originalname),
            medicalCertificateImagePath: path.join(hostname, 'medicalCertificateImage',fileOps.getFileByIndex(1, req.files).originalname),
            owner: req.body.owner
        })
        petDoc.save();

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
    }

    return res.status(400).json({
        message: 'Invalid extension, you should use JPG, JPEG or PNG'
    }) 
} 

export const retrievePetImage = (req: Request, res: Response) => {
    const hostname= 'localhost:8080';
    const path = 'profileImage';
    const fileName = 'profileImage.jpeg';
    res.status(200).json({
        message: "Profile Image",
        img: `${hostname}/${path}/${fileName}`
    })
}
