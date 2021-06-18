import { Types, Document } from "mongoose";

export interface INotification extends Document<any, {}> {
    to: String,
    from: String,
    accepted: boolean
}