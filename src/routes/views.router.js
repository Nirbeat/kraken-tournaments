import { Router } from "express";
import { __dirname } from "../rootPath.js";

const router = Router();
const viewsRoot = __dirname + '/public'
router.get('/', (req, res) => {
    res.sendFile('index.html')
})

router.get('/welcome', (req, res) => {
    res.sendFile(viewsRoot + '/deck.html')
})

export default router