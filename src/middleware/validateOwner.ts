import { Response, Request } from "express";
import { Types } from "mongoose";
import User from "../models/userModel";

const validateOwner = async (req: Request, res: Response, next) => {
    const ownerId = req.body.ownerId;
    try {
        const petDoc = await User.findById(ownerId);
        if(!petDoc)
            throw new Error('The Owner does not exist')
        next()
    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }
} 

    
export {
    validateOwner
}