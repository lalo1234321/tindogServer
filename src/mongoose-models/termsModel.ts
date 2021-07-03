import { Schema, model, Model } from 'mongoose';
import { ITerms } from '../interfaces/ITerms';

let termSchema = new Schema({
    version: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    planId: {
        type: Number,
        required: true
    },
    beginningOfvalidity: {
        type: Date,
        required: true
    },
    endOfValidity: {
        type: Date,
        required: true
    },
    status: {
        type: String
    }
});

const termsModel: Model<ITerms> = model<ITerms>('terms', termSchema);
export default termsModel;