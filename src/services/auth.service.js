const { safeCompare } = require('express-basic-auth')
const clienteRepository = require('../repositories/cliente.repository')

async function authenticate(usuario, senha) {
    if (safeCompare(usuario, 'admin')) {// && safeCompare(senha, 'desafio-igti-nodejs')
        return true
    }

    const cliente = await clienteRepository.getClienteByEmail(usuario)

    if (!cliente) {
        return false
    }

    return safeCompare(senha, cliente.senha)
}

function getRole(usuario) {
    if (usuario == 'admin') {
        return 'admin'
    } else {
        return 'cliente'
    }
}

async function authorizeOwnership(usuario, clienteId) {
    if (usuario == 'admin') {
        return true
    }

    const cliente = await clienteRepository.getClienteByEmail(usuario)

    if (!cliente) {
        return false
    }

    return cliente.cliente_id == clienteId
}

module.exports = {
    authenticate,
    getRole,
    authorizeOwnership
}