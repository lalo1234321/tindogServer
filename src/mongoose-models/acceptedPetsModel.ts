import {Schema, model, Model} from 'mongoose';

import { IAcceptedPets } from '../interfaces/IAcceptedPets';

let acceptedPetsSchema = new Schema({
    myPet: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true
    },
    acceptedPets: [{
        type: Schema.Types.ObjectId,
        ref: 'pets',
        // unique: true
    }]
}); 

const AcceptedPets = model('acceptedPets',acceptedPetsSchema);
export default AcceptedPets;
