import { Document } from "mongoose";
import { IPet } from "./IPet";
import { ITerms } from "./ITerms";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password:string;
    peso:string;
    ownedPets: Array<IPet>;
    emailConfirmed:boolean;
    premium: boolean;
    datePlan: Date[];
    isOnline: boolean;
    town: String;
}

export default IUser;