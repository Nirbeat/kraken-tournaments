import express from 'express'
// import { connection } from './database/connection.js'
import { config } from 'dotenv'
import { __dirname } from './rootPath.js';
import { connection } from './database/connection.js'
import cardsRouter from './routes/api/cards.router.js';
import decksRouter from './routes/api/decks.router.js';
import challengersRouter from './routes/api/challengers.router.js';
import viewsRouter from './routes/views.router.js'
import cors from 'cors'

config()

const app = express()

app.use(express.static(__dirname +'/public'))
app.use(cors({
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Origin']
}))

app.use('/api/cards',cardsRouter)
app.use('/api/decks', decksRouter)
app.use('/api/challengers', challengersRouter)
app.use('/', viewsRouter)
app.listen(8080, ()=> {
    console.log('conecta10')
    connection
})