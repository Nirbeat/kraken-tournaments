import { Schema, model, Types } from "mongoose";

const tournamentSchema = new Schema({
    date: Date,
    place: String,
    challengers: [
        {
            challengerId: Types.ObjectId,
            deckId: {
                type: Types.ObjectId,
                ref: 'Deck'
            }
        }
    ]

})

export default model(tournament, tournamentSchema)