import User from '../mongoose-models/userModel';
import { IUser } from "../interfaces/IUser";


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



module.exports = {
    userOnline,
    userOffline
}