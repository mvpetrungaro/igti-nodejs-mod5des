const Autor = require('../models/autor.model')

async function getAutores() {
    return await Autor.findAll()
}

async function getAutor(id) {
    return await Autor.findByPk(id)
}

async function createAutor(autor) {
    return await Autor.create(autor)
}

async function updateAutor(autor) {
    try {
        await Autor.update(autor, {
            where: {
                autor_id: autor.autor_id
            }
        })

        return await getAutor(autor.autor_id)
    } catch (err) {
        throw err
    }
}

async function deleteAutor(id) {
    await Autor.destroy({
        where: {
            autor_id: id
        }
    })
}

module.exports = {
    getAutores,
    getAutor,
    createAutor,
    updateAutor,
    deleteAutor
}