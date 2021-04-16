"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let account = {
    values: ['STANDARD', 'PREMIUM'],
    message: '${VALUE} no es tipo de cuenta válido'
};
let userScheme = new mongoose_1.Schema({
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
    ownedPets: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'pets'
        }]
});
exports.default = mongoose_1.model('users', userScheme);
//# sourceMappingURL=userModel.js.map