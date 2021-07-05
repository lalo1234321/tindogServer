import User from '../mongoose-models/userModel';
import { IUser } from "../interfaces/IUser";
import Notification from '../mongoose-models/notificationModel';
import Message from '../mongoose-models/messageModel';
import { isMobile, isMobileOnly, osName, deviceType, mobileModel, osVersion, browserName, deviceDetect, isBrowser} from 'mobile-device-detect';

const userOnline = async (uid = '') => {
    console.log(deviceDetect());
    console.log(isBrowser);
    //console.log(uid);
    const user: IUser = await User.findById(uid);
    user.deviceInformation = "S.O. " + osName + " versión: " + osVersion + " en " + deviceType + " modelo: " + mobileModel;
    user.isOnline = true;
    await user.save();
    return user;
}

const userOffline = async (uid = '') => {    
    const user: IUser = await User.findById(uid);
    user.isOnline = false;
    user.auxLastConnection = new Date();
    if (isMobile == true || isMobileOnly == true) {
        user.deviceInformation = "S.O. " + osName + " versión: " + osVersion + " en " + deviceType + " modelo: " + mobileModel;
    } else {
        user.deviceInformation = "S.O. " + osName + " versión: " + osVersion + " en " + deviceType + " navegador: " + browserName;
    }
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