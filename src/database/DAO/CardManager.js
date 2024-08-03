import cardsModel from "../models/cardsModel.js"

export default class CardManager {

    createCardData(name, type, tribe1, tribe2, expansion) {

        return {
            name, type, tribes: this.#setTribes(tribe1, tribe2), expansion
        }
    }

    #setTribes(type1, type2) {

        return [type1, type2]
    }

    async getAllCards(){
        return await cardsModel.find({})
    }

    async getCardsByFilters({expansion, type, tribes}) {

        const filters = {}

        if(expansion) filters.expansion = expansion;
        if(type) filters.type = type;
        if(tribes) filters.tribes = tribes;

        return await cardsModel.find(filters)
    }
}

