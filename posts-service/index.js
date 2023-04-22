import cors from 'cors'
import { randomBytes } from 'crypto'
import express from 'express'

const app = express()

app.use(express.json())
app.use(cors())

const userPosts = {}

app.get('/api/users/:userId/posts', (req, res) => {
    res.send(userPosts[req.params.userId])
})

app.post('/api/users/:userId/posts', (req, res) => {
    const postId = randomBytes(8).toString('hex')
    const { post } = req.body

    userPosts[req.params.userId] = [
        ...(userPosts[req.params.userId] || []),
        { id: postId, post },
    ]

    res.status(201).send(userPosts[req.params.userId])
})

app.listen(5100, () => console.log('Posts service listening on port 5100'))
