const express = require('express')
const { check, validate } = require('../validator')
const clienteController = require('../controllers/cliente.controller')

const router = express.Router()

router.get('/', clienteController.getClientes)
router.get('/:id',
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    clienteController.getCliente
)
router.post('/',
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('senha', 'Senha é obrigatória e precisa ter no mínimo 8 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caracter especial').notEmpty().bail().isStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 }),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    check('endereco', 'Endereço é obrigatório').notEmpty(),
    validate,
    clienteController.createCliente
)
router.put('/',
    check('cliente_id', 'Cliente ID é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ gt: 0 }),
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('senha', 'Senha é obrigatória e precisa ter no mínimo 8 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caracter especial').notEmpty().bail().isStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 }),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    check('endereco', 'Endereço é obrigatório').notEmpty(),
    validate,
    clienteController.updateCliente
)
router.delete('/:id', clienteController.deleteCliente)

module.exports = router