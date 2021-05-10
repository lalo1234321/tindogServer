import IFile from '../interfaces/IFile';
import * as fs from 'fs';
import * as path from "path";

class MulterFileOps {
    private _isValidFile(file: IFile): boolean {
        const originalName = file[0].originalname;
        const mimeType = file[0].mimetype;
        const fileExtension = path.extname(originalName);
        const ALLOWED_EXTENSIONS = /png|jpg|jpeg/;
            
        return ALLOWED_EXTENSIONS.test(fileExtension) && ALLOWED_EXTENSIONS.test(mimeType); 
    }
    public areAllFilesValid(files) { 
        let file: IFile;
        for(let keyFormData in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
            file = files[keyFormData];
            if(!this._isValidFile(file))
                return false;
        }
        return true;
    }
    writeFile(file: IFile) { 
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
    public getFileByIndex(index:number, files): IFile {
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
}

export default MulterFileOps;    
