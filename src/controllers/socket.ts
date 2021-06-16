import User from '../mongoose-models/userModel';
import { IUser } from "../interfaces/IUser";
import Notification from '../mongoose-models/notificationModel';

const userOnline = async( uid = '' ) => {
    //console.log(uid);
    const user:IUser = await User.findById(uid);
    user.isOnline = true;
    await user.save();
    return user;
}



const userOffline = async( uid = '' ) => {
    const user:IUser = await User.findById(uid);
    user.isOnline = false;
    await user.save();
    return user;
}

const registerNotification = async( petFrom = '', petTo = '' ) => {
    const notification = new  Notification({
        to: petTo,
        from: petFrom
    });
    await notification.save();
}   

module.exports = {
    userOnline,
    userOffline,
    registerNotification
}