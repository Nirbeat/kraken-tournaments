import { model, Schema } from "mongoose";
const cardSchema = new Schema({

    name : String,
    tribes: [String],
    expansion : String,
    type: String
})

export default model('Card', cardSchema);