const Venda = require('../models/venda.model')
const Livro = require('../models/livro.model')

async function getVendas() {
    return await Venda.findAll()
}

async function getVendasByClienteID(cliente_id) {
    return await Venda.findAll({
        where: {
            cliente_id
        }
    })
}

async function getVendasByLivroID(livro_id) {
    return await Venda.findAll({
        where: {
            livro_id
        }
    })
}

async function getVendasByFiltro(filtro) {
    let include = []
    let where = {}

    if (filtro.cliente_id) {
        where = {
            ...where,
            cliente_id: filtro.cliente_id
        }
    }

    if (filtro.livro_id) {
        where = {
            ...where,
            livro_id: filtro.livro_id
        }
    }

    if (filtro.autor_id) {
        include = [{
            model: Livro,
            where: {
                autor_id: filtro.autor_id
            },
            attributes: []
        }]
    }

    return await Venda.findAll({
        include,
        where,
        raw: false
    })
}

async function getVenda(id) {
    return await Venda.findByPk(id)
}

async function createVenda(venda) {
    return await Venda.create(venda)
}

async function updateVenda(venda) {
    try {
        await Venda.update(venda, {
            where: {
                venda_id: venda.venda_id
            }
        })

        return await getVenda(venda.venda_id)
    } catch (err) {
        throw err
    }
}

async function deleteVenda(id) {
    await Venda.destroy({
        where: {
            venda_id: id
        }
    })
}

module.exports = {
    getVendas,
    getVendasByClienteID,
    getVendasByLivroID,
    getVendasByFiltro,
    getVenda,
    createVenda,
    updateVenda,
    deleteVenda
}