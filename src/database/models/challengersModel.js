import { model, Schema, Types } from "mongoose";

const challengerSchema = new Schema({
    nickname: String,
    password: String,
    decks: {
        type: [Types.ObjectId],
        default :[]
        
    }
});

export default model('Challenger', challengerSchema)