import {Schema, model, Model} from 'mongoose'; 
import { IPet } from '../interfaces/IPet';


let petScheme = new Schema({
    username: {
        type: String,
        require: true,
        unique:true
    },
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        default: ''
    },
    vaccines: [{type:String}],
    profileImagePhysicalPath: {
        type: String,
    },
    medicalCertificateImagePhysicalPath: {
        type: String,
    },
    profileImageURI: {
        type: String,
    },
    medicalCertificateImageURI: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    }//TODO gender
},
    {timestamps: true});


const petModel: Model<IPet> = model<IPet>('pets', petScheme);
export default petModel;