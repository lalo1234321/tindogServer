import { Types, Document } from "mongoose";

export interface IChatTopic extends Document<any, {}> {
    idComprador: Types.ObjectId;
    idVendedor: Types.ObjectId;
    usernameMascota: Types.ObjectId;
    topic: String;
}