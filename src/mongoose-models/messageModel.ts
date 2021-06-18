import { Model, Schema, model }  from 'mongoose'; 


let messageSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    msg: {
        type:String
    }
},{
    timestamps: true
});


const Message = model('messages',messageSchema);
export default Message;
