const livroRepository = require('../repositories/livro.repository')
const livroInfoRepository = require('../repositories/livroinfo.repository')
const autorRepository = require('../repositories/autor.repository')
const vendaRepository = require('../repositories/venda.repository')

async function getLivros(autor_id) {
    if (autor_id) {
        return await livroRepository.getLivrosByAutorID(autor_id)
    } else {
        return await livroRepository.getLivros()
    }
}

async function getLivro(id) {
    const livro = await livroRepository.getLivro(id)

    if (livro) {
        const livroInfo = await livroInfoRepository.getLivroInfo(id)
        
        if (livroInfo) {
            livro.info = livroInfo
        }
    }

    return livro
}

async function createLivro(livro) {
    const autor = await autorRepository.getAutor(livro.autor_id)

    if (!autor) {
        throw { name: 'ForeignKeyViolationError', message: 'Autor não encontrado' }
    }

    return await livroRepository.createLivro(livro)
}

async function createLivroInfo(livroInfo) {
    const livro = await getLivro(livroInfo.livroId)

    if (!livro) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro não encontrado' }
    }

    const livroInfoExists = await livroInfoRepository.getLivroInfo(livroInfo.livroId)

    if (livroInfoExists) {
        throw { name: 'PrimaryKeyViolationError', message: 'Livro Info já existe' }
    }

    await livroInfoRepository.createLivroInfo(livroInfo)
}

async function updateLivro(livro) {
    return await livroRepository.updateLivro(livro)
}

async function updateLivroInfo(livroInfo) {
    const livro = await getLivro(livroInfo.livroId)

    if (!livro) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro não encontrado' }
    }

    await livroInfoRepository.updateLivroInfo(livroInfo)
}

async function deleteLivro(id) {
    const vendas = await vendaRepository.getVendasByLivroID(id)

    if (vendas.length) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro possui vendas cadastradas' }
    }

    await deleteLivroInfo(id)
    await livroRepository.deleteLivro(id)
}

async function deleteLivroInfo(id) {
    await livroInfoRepository.deleteLivroInfo(id)
}

async function createAvaliacao(livroId, avaliacao) {
    const livro = await getLivro(livroId)

    if (!livro) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro não encontrado' }
    }

    const livroInfo = await livroInfoRepository.getLivroInfo(livroId)

    if (!livroInfo) {
        await livroInfoRepository.createLivroInfo({
            livroId,
            avaliacoes: [avaliacao]
        })
    } else {
        if (!livroInfo.avaliacoes) {
            livroInfo.avaliacoes = []
        }

        livroInfo.avaliacoes.push(avaliacao)
        await livroInfoRepository.updateLivroInfo(livroInfo)
    }
}

async function deleteAvaliacao(livroId, indice) {
    const livroInfo = await livroInfoRepository.getLivroInfo(livroId)

    if (livroInfo && livroInfo.avaliacoes) {
        livroInfo.avaliacoes.splice(indice, 1)
        await livroInfoRepository.updateLivroInfo(livroInfo)
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