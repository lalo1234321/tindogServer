import { Document } from "mongoose";

export interface ITerms extends Document<any, {}> {
    version: String;
    description: String;
    planId: Number;
    beginningOfvalidity: Date;
    endOfValidity: Date;
    status: String;
}