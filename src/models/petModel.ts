import {Schema, model} from 'mongoose'; 


let petScheme = new Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true,
        unique:true
    },
    age: {
        type: Number,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        default: ''
    },
    vaccines: [{type:String}],
    profileImagePath: {
        type: String,
        required: true 
    },
    medicalCertificateImagePath: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    }
},
    {timestamps: true});


export default model('pets', petScheme);