const vendaService = require('../services/venda.service')

async function getVendas(req, res, next) {
    try {
        const vendas = await vendaService.getVendas({
            cliente_id: req.query.cliente_id,
            livro_id: req.query.livro_id,
            autor_id: req.query.autor_id
        })
        res.send(vendas)
    } catch(err) {
        next(err)
    }
}

async function getVenda(req, res, next) {
    try {
        const venda = await vendaService.getVenda(req.params.id)
        res.send(venda)
    } catch(err) {
        next(err)
    }
}

async function createVenda(req, res, next) {
    try {
        try {
            const venda = await vendaService.createVenda({
                data: req.body.data,
                cliente_id: req.body.cliente_id,
                livro_id: req.body.livro_id
            })
            res.send(venda)
        } catch (err) {
            if (err.name == 'ForeignKeyViolationError') {
                res.status(400)
            }

            if (err.name == 'OutOfStockError') {
                res.status(400)
            }

            throw err
        }
    } catch(err) {
        next(err)
    }
}

async function updateVenda(req, res, next) {
    try {
        try {
            const venda = await vendaService.updateVenda(req.body)
            res.send(venda)
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

async function deleteVenda(req, res, next) {
    try {
        await vendaService.deleteVenda(req.params.id)
        res.end()
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getVendas,
    getVenda,
    createVenda,
    updateVenda,
    deleteVenda
}