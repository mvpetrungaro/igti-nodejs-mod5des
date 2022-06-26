const authService = require('../services/auth.service')

async function authenticate(usuario, senha, callback) {
    const authenticated = await authService.authenticate(usuario, senha)
    return callback(null, authenticated)
}

function authorize(...allowed) {
    return async (req, res, next) => {
        const role = await authService.getRole(req.auth.user)

        if (allowed.indexOf(role) >= 0) {
            next()
        } else {
            res.status(403)
            next('Você não tem permissão para acessar esse recurso')
        }
    }
}

async function authorizeOwnership(req, res, next) {
    const id = req.params.id || req.query.cliente_id || req.body.cliente_id

    const owner = await authService.authorizeOwnership(req.auth.user, id)

    if (owner) {
        next()
    } else {
        res.status(403)
        next('Você não tem permissão para acessar esse recurso')
    }
}

module.exports = {
    authenticate,
    authorize,
    authorizeOwnership
}