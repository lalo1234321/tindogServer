import { Router, Request, Response } from 'express';
import Pet from "../models/petModel"; 
import * as path from 'path';
import * as multer from "multer";
import * as fs from 'fs';
import { displayErrors, validateMediaFields } from "../middleware/validateFormDataFields"; 
import { body } from 'express-validator';


//Config Storage Engine
const storage: multer.StorageEngine = multer.memoryStorage();

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../../serverStorage')
})

const router = Router(); 
const validateFields = [
    body('name').not().isEmpty(),
    displayErrors,
    body('age').not().isEmpty(),
    displayErrors,
    body('specie').not().isEmpty(),
    displayErrors,
    body('breed').not().isEmpty(),
    displayErrors,
    body('vaccines').not().isEmpty(),
    displayErrors,
    body('owner').not().isEmpty(),
    displayErrors,
]
const uploadFormData = upload.fields([ 
    {name: "name"},
    {name: "age"},
    {name: "specie"},
    {name: "breed"},
    {name: "vaccines"},
    {name: "owner"},
    {name: "medicalCertificateImage"},
    {name: "profileImage"},
])
router.post('/pet', uploadFormData , validateFields, validateMediaFields, (req: Request, res: Response) => { 
    //console.log('req.body: ', req.body);
    if(areAllFilesValid(req.files)) { 
        writeFiles(req.files);
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

export function isValidFile(file: Express.Multer.File): boolean {
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
        const writableStream = fs.createWriteStream(path.join(__dirname, '../../serverStorage', `${file[0].originalname}`));
        writableStream.write(file[0].buffer); 
    }
}

export default { router}