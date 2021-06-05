import {Schema, model} from 'mongoose'; 


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
    breed: {
        type: String,
        default: ''
    },
    vaccines: [{type:String}],
    profileImage: {
        type: String,
    },
    medicalCertificateImage: {
        type: String,
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