const autorRepository = require('../repositories/autor.repository')
const livroRepository = require('../repositories/livro.repository')

async function getAutores() {
    return await autorRepository.getAutores()
}

async function getAutor(id) {
    return await autorRepository.getAutor(id)
}

async function createAutor(autor) {
    return await autorRepository.createAutor(autor)
}

async function updateAutor(autor) {
    return await autorRepository.updateAutor(autor)
}

async function deleteAutor(id) {
    const livros = await livroRepository.getLivrosByAutorID(id)

    if (livros.length) {
        throw { name: 'ForeignKeyViolationError', message: 'Autor possui livros cadastrados' }
    }
    
    await autorRepository.deleteAutor(id)
}

module.exports = {
    getAutores,
    getAutor,
    createAutor,
    updateAutor,
    deleteAutor
}