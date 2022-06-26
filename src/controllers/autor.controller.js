const autorService = require('../services/autor.service')

async function getAutores(_req, res, next) {
    try {
        const autores = await autorService.getAutores()
        res.send(autores)
    } catch(err) {
        next(err)
    }
}

async function getAutor(req, res, next) {
    try {
        const autor = await autorService.getAutor(req.params.id)
        res.send(autor)
    } catch(err) {
        next(err)
    }
}

async function createAutor(req, res, next) {
    try {
        const autor = await autorService.createAutor({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        })
        res.send(autor)
    } catch(err) {
        next(err)
    }
}

async function updateAutor(req, res, next) {
    try {
        const autor = await autorService.updateAutor({
            autor_id: req.body.autor_id,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        })
        res.send(autor)
    } catch(err) {
        next(err)
    }
}

async function deleteAutor(req, res, next) {
    try {
        try {
            await autorService.deleteAutor(req.params.id)
            res.end()
        } catch (err) {
            if (err.name == 'ForeignKeyViolationError') {
                res.status(400)
            }

            throw err
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getAutores,
    getAutor,
    createAutor,
    updateAutor,
    deleteAutor
}