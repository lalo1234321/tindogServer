import { Types, Document } from "mongoose";

export interface IPet extends Document<any, {}> {
    username: String;
    name: String;
    age: Number;
    specie: String;
    breed: String;
    gender: String;
    vaccines: String[];
    profileImagePhysicalPath: String;
    medicalCertificateImagePhysicalPath: String;
    profileImageURI: String,
    medicalCertificateImageURI: String;
    isDeleted: Boolean;
    owner: Types.ObjectId;
}