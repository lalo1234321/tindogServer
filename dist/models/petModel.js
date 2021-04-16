"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let species = {
    values: ['DOG'],
    message: '${VALUE} no es un tipó de cuenta válido'
};
let breeds = {
    values: ['FRENCH'],
    message: '${VALUE} this breed value does not exist'
};
let petScheme = new mongoose_1.Schema({
    nickName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        default: '',
        enum: breeds
    },
    vaccines: [{ type: String }],
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
});
exports.default = mongoose_1.model('pets', petScheme);
//# sourceMappingURL=petModel.js.map