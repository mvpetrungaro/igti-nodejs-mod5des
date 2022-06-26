const Cliente = require('../models/cliente.model')

async function getClientes() {
    return await Cliente.findAll()
}

async function getCliente(id) {
    return await Cliente.findByPk(id)
}

async function createCliente(cliente) {
    return await Cliente.create(cliente)
}

async function updateCliente(cliente) {
    try {
        await Cliente.update(cliente, {
            where: {
                cliente_id: cliente.cliente_id
            }
        })

        return await getCliente(cliente.cliente_id)
    } catch (err) {
        throw err
    }
}

async function deleteCliente(id) {
    await Cliente.destroy({
        where: {
            cliente_id: id
        }
    })
}

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}