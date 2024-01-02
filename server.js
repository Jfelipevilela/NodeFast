// import { createServer } from 'node:http'

// const server = createServer((request,response) =>{
//     response.write('hello')

//     return response.end()
// })

// server.listen(3333)

import {fastify} from 'fastify'
import {databaseMemory} from './database.js'

const server = fastify()
const database = new databaseMemory()

// localhost:3333/videos

server.post('/videos', (request, reply)=>{

    const {title , description, duration} = request.body

    database.create({
        title: title,
        description: description,
        duration: duration,
    })
    return reply.status(201).send()
})

server.get('/videos', (request, reply)=>{
    const videos = database.list()

    return videos
})

server.put('/videos/:id', (request,reply)=>{
    const videoId = request.params.id
    const {title , description, duration} = request.body

    database.update(videoId, {
        title: title,
        description: description,
        duration: duration,
    })
    console.log(title , description, duration)
    return reply.status(204).send()
})

server.delete('/videos/:id', (request,reply)=>{
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
})