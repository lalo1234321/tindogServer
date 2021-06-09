import { Model, Document, Types } from "mongoose";
import { KindOfImage } from "../interfaces/IFile";
import { IPet } from "../interfaces/IPet";

export const generateURI_forFile = (path: String): String => {
    const hostname= 'localhost:8080';
    let pathTokes: string[];
    let fileName: string;
    let typeOfImage: String;

    if(process.platform === "win32") {
        pathTokes = path.split('\\');
        fileName = pathTokes[pathTokes.length - 1];
        typeOfImage = pathTokes[pathTokes.length - 2];
    } else {
        pathTokes = path.split('/');
        fileName = pathTokes[pathTokes.length - 1];
        typeOfImage = pathTokes[pathTokes.length - 2];
    }
    const imageURI = `${hostname}/${typeOfImage}/${fileName}`;
    return imageURI;
}
export const generateURI_forModelTest = async <T extends Document>(id: Types.ObjectId, kindOfImage: String, Pet: Model<T>): Promise<String> => {
    const hostname= 'localhost:8080';
    const path = kindOfImage;
    
    const petDoc = await Pet.findById(id).exec(); 
    if(!petDoc)
        throw new Error('The pet does not exist');
        
    let pathTokes: string[];
    if(process.platform === "win32")
        pathTokes = petDoc[`${path}`].split('\\');
    else
        pathTokes = petDoc[`${path}`].split('/');
    let fileName = pathTokes[pathTokes.length - 1];
    const imageURI = `${hostname}/${path}/${fileName}`;
    return imageURI;
}