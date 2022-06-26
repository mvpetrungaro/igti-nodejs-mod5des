require('dotenv').config()
const express = require('express')
const basicAuth = require('express-basic-auth')
const db = require('./db')
const clienteRouter = require('./routers/cliente.router')
const autorRouter = require('./routers/autor.router')
const livroRouter = require('./routers/livro.router')
const vendaRouter = require('./routers/venda.router')
const authControler = require('./controllers/auth.controller')

const app = express()

app.use(express.json())

app.get('/', async (_req, res, _next) => {
    res.status(200).send('Working properly')
})

app.use(basicAuth({
    authorizer: authControler.authenticate,
    authorizeAsync: true,
    unauthorizedResponse: { error: 'Usuário ou senha inválidos' }
}))

app.use('/clientes', clienteRouter)
app.use('/autores', autorRouter)
app.use('/livros', livroRouter)
app.use('/vendas', vendaRouter)

app.use(async (err, _req, res, _next) => {

    console.log(err)
    //console.log(res.statusCode)

    if (!res.statusCode || res.statusCode.toString().startsWith(2)) {
        res.status(500)
    }

    if (err.message) {
        res.json({ error: err.message })
    } else {
        res.json({ error: err })
    }
})

db.sync().then(() => {
    console.log('Connected to the DB!')
})

app.listen(3000, () => {
    console.log('API Started!')
})

module.exports = app