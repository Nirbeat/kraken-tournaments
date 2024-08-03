import XlsxPopulate from "xlsx-populate";
import CardManager from "./DAO/CardManager.js";

const scrappedData = []

const cardsData = await XlsxPopulate.fromFileAsync('./ListadoDeCartas.xlsx')
    .then(data=>{
        const [, ...cards] = data.sheet(0).usedRange().value();

        return cards
    })


cardsData.forEach((card)=>{

    const [name, , ,expansion, ,type, ,tribe1, tribe2] = card
    const newCard = new CardManager().createCardData(name, type, tribe1, tribe2, expansion)

    scrappedData.push(newCard)
})

export default scrappedData