const livroService = require('../services/livro.service')

async function getLivros(req, res, next) {
    try {
        const livros = await livroService.getLivros(req.query.autor_id)
        res.send(livros)
    } catch(err) {
        next(err)
    }
}

async function getLivro(req, res, next) {
    try {
        const livro = await livroService.getLivro(parseInt(req.params.id))
        res.send(livro)
    } catch(err) {
        next(err)
    }
}

async function createLivro(req, res, next) {
    try {
        try {
            const livro = await livroService.createLivro({
                nome: req.body.nome,
                valor: req.body.valor,
                estoque: req.body.estoque,
                autor_id: req.body.autor_id
            })
            res.send(livro)
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

async function createLivroInfo(req, res, next) {
    try {
        try {
            await livroService.createLivroInfo({
                livroId: parseInt(req.params.id),
                descricao: req.body.descricao,
                paginas: parseInt(req.body.paginas),
                editora: req.body.editora
            })
            res.status(201).end()
        } catch (err) {
            if (err.name == 'ForeignKeyViolationError' || err.name == 'PrimaryKeyViolationError') {
                res.status(400)
                console.log(res.statusCode)
            }

            throw err
        }
    } catch(err) {
        next(err)
    }
}

async function updateLivro(req, res, next) {
    try {
        try {
            const livro = await livroService.updateLivro({
                livro_id: req.body.livro_id,
                valor: req.body.valor,
                estoque: req.body.estoque
            })
            res.send(livro)
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

async function updateLivroInfo(req, res, next) {
    try {
        try {
            await livroService.updateLivroInfo({
                livroId: parseInt(req.params.id),
                descricao: req.body.descricao,
                paginas: parseInt(req.body.paginas),
                editora: req.body.editora
            })
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

async function deleteLivro(req, res, next) {
    try {
        try {
            await livroService.deleteLivro(parseInt(req.params.id))
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

async function deleteLivroInfo(req, res, next) {
    try {
        await livroService.deleteLivroInfo(parseInt(req.params.id))
        res.status(204).end()
    } catch(err) {
        next(err)
    }
}

async function createAvaliacao(req, res, next) {
    try {
        try {
            await livroService.createAvaliacao(
                parseInt(req.params.id),
                {
                    nome: req.body.nome,
                    nota: parseInt(req.body.nota),
                    avaliacao: req.body.avaliacao
                }
            )
            res.status(201).end()
        } catch (err) {
            if (err.name == 'ForeignKeyViolationError') {
                res.status(400)
                console.log(res.statusCode)
            }

            throw err
        }
    } catch(err) {
        next(err)
    }
}

async function deleteAvaliacao(req, res, next) {
    try {
        try {
            await livroService.deleteAvaliacao(parseInt(req.params.id), parseInt(req.params.indice))
            res.status(204).end()
        } catch (err) {
            if (err.name == 'ForeignKeyViolationError') {
                res.status(400)
                console.log(res.statusCode)
            }

            throw err
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getLivros,
    getLivro,
    createLivro,
    createLivroInfo,
    updateLivro,
    updateLivroInfo,
    deleteLivro,
    deleteLivroInfo,
    createAvaliacao,
    deleteAvaliacao
}