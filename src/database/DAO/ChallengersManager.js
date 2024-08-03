import challengersModel from "../models/challengersModel.js";

export default class ChallengersManager {

    async getChallengerByNickname(nickname){
        return await challengersModel.findOne({nickname}).lean()
    }

    async createChallenger(nickname, password) {

        return (await challengersModel.create({ nickname, password })).toObject()
    }

    async assignDeckToChallengerById(challengerId, deckId) {

        const challenger = await challengersModel.findById(challengerId)

        challenger.decks.push(deckId)
        challenger.save()

    }
}