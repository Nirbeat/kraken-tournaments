import decksModel from "../models/decksModel.js";

export default class DeckManager{

    async createDeck(cards, challengerId){

        const {_id : deckId} = await decksModel.create(cards)
        const challengerManager = new (await import('../DAO/ChallengersManager.js')).default()
        return await challengerManager.assignDeckToChallengerById(challengerId, deckId)
    }

    async getDeckById(deckId){
        return await decksModel.findById(deckId).populate('cards.card')

    }
}