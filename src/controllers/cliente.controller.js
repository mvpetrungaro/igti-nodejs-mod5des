const clienteService = require('../services/cliente.service')

async function getClientes(_req, res, next) {
    try {
        const clientes = await clienteService.getClientes()
        res.send(clientes)
    } catch(err) {
        next(err)
    }
}

async function getCliente(req, res, next) {
    try {
        const cliente = await clienteService.getCliente(req.params.id)
        res.send(cliente)
    } catch(err) {
        next(err)
    }
}

async function createCliente(req, res, next) {
    try {
        const cliente = await clienteService.createCliente({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            senha: req.body.senha
        })
        res.send(cliente)
    } catch(err) {
        next(err)
    }
}

async function updateCliente(req, res, next) {
    try {
        const cliente = await clienteService.updateCliente({
            cliente_id: req.body.cliente_id,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            senha: req.body.senha
        })
        res.send(cliente)
    } catch(err) {
        next(err)
    }
}

async function deleteCliente(req, res, next) {
    try {
        try {
            await clienteService.deleteCliente(req.params.id)
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

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}