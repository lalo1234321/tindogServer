import User from '../mongoose-models/userModel';
import { IUser } from "../interfaces/IUser";
import Notification from '../mongoose-models/notificationModel';
import Message from '../mongoose-models/messageModel';

const userOnline = async (uid = '') => {
    //console.log(uid);
    const user: IUser = await User.findById(uid);
    user.isOnline = true;
    await user.save();
    return user;
}



const userOffline = async (uid = '') => {
    const user: IUser = await User.findById(uid);
    user.isOnline = false;
    user.auxLastConnection = new Date();
    await user.save();
    return user;
}

const registerNotification = async (petFrom = '', petTo = '') => {
    const notification = new Notification({
        to: petTo,
        from: petFrom
    });
    await notification.save();
}

const registerMessage = async (petFrom = '', petTo = '', msg = '') => {
    const message = new Message({
        from: petFrom,
        to: petTo,
        msg
    });
    await message.save();
}



module.exports = {
    userOnline,
    userOffline,
    registerNotification,
    registerMessage
}