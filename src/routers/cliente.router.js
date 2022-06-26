const express = require('express')
const { check, validate } = require('../validator')
const clienteController = require('../controllers/cliente.controller')
const authControler = require('../controllers/auth.controller')

const router = express.Router()

router.get('/',
    authControler.authorize('admin'),
    clienteController.getClientes
)
router.get('/:id',
    authControler.authorize('admin', 'cliente'),
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    authControler.authorizeOwnership,
    clienteController.getCliente
)
router.post('/',
    authControler.authorize('admin'),
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('senha', 'Senha é obrigatória e precisa ter no mínimo 8 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caracter especial').notEmpty().bail().isStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 }),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    check('endereco', 'Endereço é obrigatório').notEmpty(),
    validate,
    clienteController.createCliente
)
router.put('/',
    authControler.authorize('admin', 'cliente'),
    check('cliente_id', 'Cliente ID é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ gt: 0 }),
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('senha', 'Senha é obrigatória e precisa ter no mínimo 8 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caracter especial').notEmpty().bail().isStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 }),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    check('endereco', 'Endereço é obrigatório').notEmpty(),
    validate,
    authControler.authorizeOwnership,
    clienteController.updateCliente
)
router.delete('/:id',
    authControler.authorize('admin'),
    clienteController.deleteCliente
)

module.exports = router