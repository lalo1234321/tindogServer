import { Document } from "mongoose";

export interface IUser extends Document {
    

    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password:string;
    peso:string;
    emailConfirmed:boolean
    premiun:boolean
}

export default IUser;