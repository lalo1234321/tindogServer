import User from '../mongoose-models/userModel';
import { IUser } from "../interfaces/IUser";
import Notification from '../mongoose-models/notificationModel';
import Message from '../mongoose-models/messageModel';
import DeviceDetector = require("device-detector-js");

const MobileDetect = require('mobile-detect');

const userOnline = async (uid = '') => {
    const user: IUser = await User.findById(uid);
    user.isOnline = true;
    await user.save();
    return user;
}

const userOffline = async (uid = '', req) => {
    const user: IUser = await User.findById(uid);
    user.isOnline = false;
    user.auxLastConnection = new Date();

    const deviceDetector = new DeviceDetector();
    const userAgent = new MobileDetect(req.headers['user-agent']);
    console.log(userAgent.ua);
    const device=deviceDetector.parse(userAgent);
    console.log(device);

    user.deviceInformation=userAgent.ua;
    /*if (isMobile == true || isMobileOnly == true) {
        user.deviceInformation = "S.O. " + osName + " versión: " + osVersion + " en " + deviceType + " modelo: " + mobileModel;
    } else {
        user.deviceInformation = "S.O. " + osName + " versión: " + osVersion + " en " + deviceType + " navegador: " + browserName;
    }*/
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