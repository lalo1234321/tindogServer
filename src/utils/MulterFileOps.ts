import IFile, { KindOfImage } from '../interfaces/IFile';
import * as fs from 'fs';
import * as path from "path";

export class MulterFileOps {
    constructor() { }
    private _isValidFile(file: IFile): boolean {
        const originalName = file[0].originalname;
        const mimeType = file[0].mimetype;
        const fileExtension = path.extname(originalName);
        const ALLOWED_EXTENSIONS = /png|jpg|jpeg/;
            
        return ALLOWED_EXTENSIONS.test(fileExtension) && ALLOWED_EXTENSIONS.test(mimeType); 
    }
    public areAllFilesValid(files): boolean { 
        let file: IFile;
        for(let keyFormData in files) { // 'in' returns a string (the key), 'of' returns the value (only works with iterable objects)
            file = files[keyFormData];
            if(!this._isValidFile(file))
                return false;
        }
        return true;
    }
    writeFile(file: IFile, newFileName: String): string { 
        let writableStream;
        const filePath = path.join(__dirname, `${file.dirStorageOption}`, `${newFileName}`);
        writableStream = fs.createWriteStream(filePath);
        writableStream.write(file.buffer); 
        return filePath;
    }
    public rearrangeFileStructure(rawFile): IFile {
        let file: IFile = rawFile[0];
        switch(file.fieldname) {
            case KindOfImage.MEDICAL_CERTIFICATE_IMAGE:
                file.dirStorageOption = `../../public/${KindOfImage.MEDICAL_CERTIFICATE_IMAGE}/`;
                break;
            case KindOfImage.PROFILE_IMAGE:
                file.dirStorageOption = `../../public/${KindOfImage.PROFILE_IMAGE}/`;
                break;
        }
        return file;
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
