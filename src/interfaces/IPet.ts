import { Types, Document } from "mongoose";

export interface IPet extends Document<any, {}> {
    username: String;
    name: String;
    age: number;
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
    stars: Number;
    meetingsNumber: Number;
    previousMeetings: Array<Types.ObjectId>;
}