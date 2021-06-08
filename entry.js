const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

var morgan = require('morgan')
server.use(morgan('combined'))

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handle(req, res)
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})

module.exports = server;