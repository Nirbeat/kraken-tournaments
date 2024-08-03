import { json, Router, urlencoded } from "express";
import DeckManager from "../../database/DAO/DeckManager.js";
import cookieParser from "cookie-parser";
import { validateToken } from "../../authentication/jwt.js";

const router = Router()

router.use(cookieParser())

router.get('/:deckId', async (req, res) => {
    const {deckId} = req.params;

    res.json(await new DeckManager().getDeckById(deckId))
})

router.use(json())
router.use(urlencoded({extended:false}))

router.post('/register', async (req, res)=> {

    const {token} = req.cookies;
    const {_id : challengerId} = validateToken(token)
    const registeredDeck = await new DeckManager().createDeck(req.body, challengerId)
    res.json(registeredDeck)
})

export default router