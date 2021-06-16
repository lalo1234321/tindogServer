import {Schema, model, Model} from 'mongoose';

import { INotification } from '../interfaces/INotification';

let notificationSchema = new Schema ({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const notificationModel: Model<INotification> = model<INotification>('notifications', notificationSchema);
export default notificationModel;