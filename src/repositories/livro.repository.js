const Livro = require('../models/livro.model')

async function getLivros() {
    return await Livro.findAll()
}

async function getLivrosByAutorID(autor_id) {
    return await Livro.findAll({
        where: {
            autor_id
        }
    })
}

async function getLivro(id) {
    return await Livro.findByPk(id)
}

async function createLivro(livro) {
    return await Livro.create(livro)
}

async function updateLivro(livro) {
    try {
        await Livro.update(livro, {
            where: {
                livro_id: livro.livro_id
            }
        })

        return await getLivro(livro.livro_id)
    } catch (err) {
        throw err
    }
}

async function deleteLivro(id) {
    await Livro.destroy({
        where: {
            livro_id: id
        }
    })
}

module.exports = {
    getLivros,
    getLivrosByAutorID,
    getLivro,
    createLivro,
    updateLivro,
    deleteLivro
}