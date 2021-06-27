import { Types, Document } from "mongoose";

export interface ISales extends Document<any, {}> {
    pet: String;
    price: Number;
    location: String;
    idSeller: Types.ObjectId;
    idBuyer: Types.ObjectId;
    status: String;
}