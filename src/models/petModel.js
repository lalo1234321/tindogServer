const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let species = {
    values: ['DOG'],
    message: '${VALUE} no es un tipó de cuenta válido'
};
let breeds = {
    values: ['dsa']
}
let petScheme = new Schema({
    nickName:{
        type: String,
        required: true
    },
    specie: {
        type: String,
        default: 'DOG',
        enum: species
    },
    breed: {
        type: String,
        default: '',
        enum:breeds

    }
});

