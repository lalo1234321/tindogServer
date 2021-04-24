import {Schema, model} from 'mongoose'; 

let account = {
    values:['STANDARD','PREMIUM'],
    message: '${VALUE} no es tipo de cuenta válido'
};

let userScheme = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    typeAccount: {
        type: String,
        default: 'STANDARD',
        enum: account
    },
    state: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    ownedPets:[{
        type: Schema.Types.ObjectId,
        ref: 'pets'     
    }]},
    {timestamps: true}
);

export default model('users',userScheme);