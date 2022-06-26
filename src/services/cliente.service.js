const clienteRepository = require('../repositories/cliente.repository')
const vendaRepository = require('../repositories/venda.repository')

async function getClientes() {
    const clientes = await clienteRepository.getClientes()
    clientes.forEach(c => delete c.senha)
    
    return clientes
}

async function getCliente(id) {
    const cliente = await clienteRepository.getCliente(id)

    if (cliente) {
        delete cliente.senha
    }

    return cliente
}

async function createCliente(cliente) {
    return await clienteRepository.createCliente(cliente)
}

async function updateCliente(cliente) {
    return await clienteRepository.updateCliente(cliente)
}

async function deleteCliente(id) {
    const vendas = await vendaRepository.getVendasByClienteID(id)

    if (vendas.length) {
        throw { name: 'ForeignKeyViolationError', message: 'Cliente possui vendas cadastradas' }
    }

    await clienteRepository.deleteCliente(id)
}

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}