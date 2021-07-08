import {Schema, model, Model} from 'mongoose'; 
import { IChatTopic } from '../interfaces/IChatTopic'

let chatTopic = new Schema({
    idComprador: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idVendedor: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    topic: {
        type: String
    }
});

const chatTopicmodel: Model<IChatTopic> = model<IChatTopic>('chatTopic', chatTopic);
export default chatTopicmodel;