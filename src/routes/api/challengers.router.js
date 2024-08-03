import { json, Router, urlencoded } from "express";
import ChallengersManager from "../../database/DAO/ChallengersManager.js";
import { createToken } from "../../authentication/jwt.js";
import { hashPassword, validatePassword } from "../../authentication/bcrypt.js";

const router = Router();

const challManager = new ChallengersManager()

router.get('/:challengerId', async (req, res) => {

    const { challengerId } = req.params.challengerId
    res.json(await challManager.getChallengerById(challengerId))
})

router.use(json());
router.use(urlencoded({ extended: true }))

router.post('/register', async (req, res) => {

    const { nickname, password } = req.body

    let challenger;

    if (await challManager.getChallengerByNickname(nickname) == null) {
        challenger = await new ChallengersManager().createChallenger(nickname, hashPassword(password))
    } else {
        challenger = await challManager.getChallengerByNickname(nickname)
    }
    if(validatePassword(password, challenger.password)){

        const token = createToken(challenger)
        res.cookie('token', token).redirect('/welcome')
    }
})

router.put('/register', async (req, res) => {
    const { challengerId, deckId } = req.body;

    await challManager.assignDeckToChallengerById(challengerId, deckId)
})

export default router