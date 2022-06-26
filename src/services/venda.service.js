const vendaRepository = require('../repositories/venda.repository')
const clienteRepository = require('../repositories/cliente.repository')
const livroRepository = require('../repositories/livro.repository')

async function getVendas(filtro) {
    if (Object.entries(filtro).some(e => e[1])) {
        return await vendaRepository.getVendasByFiltro(filtro)
    } else {
        return await vendaRepository.getVendas()
    }
}

async function getVenda(id, email) {
    const venda = await vendaRepository.getVenda(id)

    if (email) {
        const cliente = await clienteRepository.getClienteByEmail(email)

        if (!venda || cliente.cliente_id != venda.cliente_id) {
            throw { name: 'Forbidden', message: 'Você não tem permissão para acessar esse recurso' }
        }
    }
    
    return venda
}

async function createVenda(venda) {
    const cliente = await clienteRepository.getCliente(venda.cliente_id)

    if (!cliente) {
        throw { name: 'ForeignKeyViolationError', message: 'Cliente não encontrado' }
    }

    const livro = await livroRepository.getLivro(venda.livro_id)

    if (!livro) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro não encontrado' }
    }

    if (livro.estoque <= 0) {
        throw { name: 'OutOfStockError', message: 'Livro fora de estoque' }
    }

    livro.estoque = livro.estoque - 1

    await livroRepository.updateLivro(livro)

    return await vendaRepository.createVenda({
        ...venda,
        valor: livro.valor
    })
}

async function updateVenda(venda) {
    const cliente = await clienteRepository.getCliente(venda.cliente_id)

    if (!cliente) {
        throw { name: 'ForeignKeyViolationError', message: 'Cliente não encontrado' }
    }

    const livro = await livroRepository.getAutor(venda.livro_id)

    if (!livro) {
        throw { name: 'ForeignKeyViolationError', message: 'Livro não encontrado' }
    }
    
    return await vendaRepository.updateVenda(venda)
}

async function deleteVenda(id) {
    await vendaRepository.deleteVenda(id)
}

module.exports = {
    getVendas,
    getVenda,
    createVenda,
    updateVenda,
    deleteVenda
}