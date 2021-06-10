import { Response, Request } from "express";
import { Types } from "mongoose";
import User from "../mongoose-models/userModel";

const validateOwner = async (req: Request, res: Response, next) => {
    const ownerId = req.userId;
    try {
        const petDoc = await User.findById(ownerId);
        if(!petDoc)
            throw new Error('The Owner does not exist')
        next()
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
} 

    
export {
    validateOwner
}