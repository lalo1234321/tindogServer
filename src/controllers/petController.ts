import {Request, Response} from 'express';
import * as fs from 'fs';
import * as path from "path";
import Pet from "../models/petModel"; 
import IFile from "../interfaces/IFile";

export const registerPet = (req: Request, res: Response) => { 
    if(areAllFilesValid(req.files)) { 
        const setOfFilesLength = Object.entries(req.files).length;
        let file: IFile;
        for(let index = 0; index < setOfFilesLength; index++) {
            file = getFileByIndex(index, req.files);//TODO Refactor code
            file.dirStorageOption = index;
            writeFile(file);
        }
        const hostname = 'localhost:8080';
        const petDoc = new Pet({
            name: req.body.name,
            username: req.body.username,
            age: req.body.age,
            specie: req.body.specie,
            breed: req.body.breed,
            vaccines: req.body.vaccines,
            profileImagePath: path.join(hostname, 'profileImagePath', getFileByIndex(0, req.files).originalname),
            medicalCertificateImagePath: path.join(hostname, 'medicalCertificateImage',getFileByIndex(1, req.files).originalname),
            owner: req.body.owner
        })
        petDoc.save();

        return res.status(200).json({
            "message": "Pet registered",
            "petInfo": { 
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

function areAllFilesValid(files) { 
    let file: IFile;
    for(let keyFormData in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
        file = files[keyFormData];
        if(!isValidFile(file))
            return false;
    }
    return true;
}

function writeFile(file: IFile) { 
    let writableStream;
    switch(file.dirStorageOption) {
        case 0:
            writableStream = fs.createWriteStream(
                path.join(__dirname, '../../public/medicalCertificateImage', `${file.originalname}`));
                break;
        case 1:
            writableStream = fs.createWriteStream(
                path.join(__dirname, '../../public/profileImage', `${file.originalname}`));
            break;
    }
    
    writableStream.write(file.buffer); 
}

function isValidFile(file: IFile): boolean {
    const originalName = file[0].originalname;
    const mimeType = file[0].mimetype;
    const fileExtension = path.extname(originalName);
    const ALLOWED_EXTENSIONS = /png|jpg|jpeg/;
        
    return ALLOWED_EXTENSIONS.test(fileExtension) && ALLOWED_EXTENSIONS.test(mimeType); 
}
function getFileByIndex(index:number, files): IFile {
    let fileWrappedByArray: IFile[];
    let i = 0;
    if(Object.entries(files).length > 2)
        throw Error('Files set length exceeded');
    if(Object.entries(files).length < 0)
        throw Error('Index number negative');
    for(let formDataKey in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
        fileWrappedByArray = files[formDataKey];
        if(i == index)
            return fileWrappedByArray[0];
        i++;
    }
}