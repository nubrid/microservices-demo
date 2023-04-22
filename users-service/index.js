import cors from 'cors'
import { randomBytes } from 'crypto'
import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())
app.use(cors())

const users = {}

app.get('/api/users', (req, res) => {
    res.send(users)
})

app.post('/api/users', (req, res) => {
    const id = randomBytes(8).toString('hex')
    const { name } = req.body

    users[id] = { id, name }

    res.status(201).send(users[id])
})

async function Start() {
    try {
        // mongodb://<metadata_name_from_users-service-mongo-deploy.yaml>:27017/<database_name>
        await mongoose.connect('mongodb://users-service-mongo:27017/users')
        console.log('Connected to mongo')
    } catch (error) {
        console.log(error)
    }

    app.listen(5000, () => console.log('Users service listening on port 5000'))
}

Start()
