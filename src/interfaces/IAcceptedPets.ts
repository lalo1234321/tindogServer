import { Types, Document } from "mongoose";
import { IPet } from "./IPet";
 
export interface IAcceptedPets extends Document<any, {}> {
    myPet: Types.ObjectId,
    acceptedPets: Array<IPet>
}