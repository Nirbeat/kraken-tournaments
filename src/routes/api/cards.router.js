import { Router } from "express";
// import cardsModel from "../../database/models/cardsModel.js";
import CardManager from "../../database/DAO/CardManager.js";
import scrappedData from "../../database/cards.js";
import cardsModel from "../../database/models/cardsModel.js";

const router = Router()

router.get('/', async (req, res)=>{
    try {
       res.json(await new CardManager().getAllCards())
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) =>{
    
    res.json(await new CardManager().getCardsByFilters(req.query))
})

await cardsModel.deleteMany({})
await cardsModel.create(scrappedData)
export default router