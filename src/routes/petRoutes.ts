import { Router, Request, Response } from 'express';
import Pet from "../models/petModel"; 
import * as path from 'path';
import * as multer from "multer";
import * as fs from 'fs';



//Config Storage Engine
const storage: multer.StorageEngine = multer.memoryStorage();

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../../assets2')
})

const router = Router(); 

const formDataFields = upload.fields([ 
    {name: "name"},
    {name: "age"},
    {name: "specie"},
    {name: "breed"},
    {name: "vaccines"},
    {name: "owner"},
    {name: "medicalCertificateImage"},
    {name: "profileImage"},
])
router.post('/pet', formDataFields , (req: Request, res: Response) => { 
 
        if(areAllFilesValid(req.files)) { 
            writeFiles(req.files);
            return res.status(200).json({
                "message": "Pet registered",
                "petInfo": { 
                    "name": "fernando",
                    "age": "12",
                    "specie": "perro",
                    "breed": "french poodle",
                    "vaccines":"covid-19",
                    "owner":"60791f8afd3aa23fb3716229"
                } 
            })
        }

        return res.status(400).json({
            message: 'Invalid extension, you should use JPG, JPEG or PNG'
        }) 
}) 

function areAllFilesValid(files) { 
    let file: Express.Multer.File;
    for(let keyFormData in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
        file = files[keyFormData];
        if(!isValidFile(file))
            return false;
    }
    return true;
}

function isValidFile(file: Express.Multer.File): boolean {
    const originalName = file[0].originalname;
    const mimeType = file[0].mimetype;
    const fileExtension = path.extname(originalName);
    const ALLOWED_EXTENSIONS = /png|jpg|jpeg/;
     
    return ALLOWED_EXTENSIONS.test(fileExtension) && ALLOWED_EXTENSIONS.test(mimeType); 
}
function writeFiles(files) { 
    let file: Express.Multer.File;
    
    for(let keyFormData in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
        file = files[keyFormData];
        const writableStream = fs.createWriteStream(path.join(__dirname, '../../assets2', `${file[0].originalname}`));
        writableStream.write(file[0].buffer); 
    }
}

module.exports = router;