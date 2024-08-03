import { model, Schema, Types } from "mongoose";
const decksSchema = new Schema({

    cards:[{
            card: {
                type:Types.ObjectId,
                ref:'Card'
            },
            quantity: Number,
        }
    ]
})

export default model('Deck', decksSchema);