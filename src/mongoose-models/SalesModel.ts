import {Schema, model, Model} from 'mongoose'; 
import { ISales } from '../interfaces/ISales';

let saleSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: "No especificado"
    },
    idSeller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    idBuyer: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'users'
    },
    status: {
        type: String,
        default: "Disponible"
    }
});

const salesModel: Model<ISales> = model<ISales>('sales', saleSchema);
export default salesModel;