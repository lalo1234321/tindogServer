import { Document } from "mongoose";
import { IPet } from "./IPet";

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
    datePlan: Date[],
    isOnline: boolean
}

export default IUser;