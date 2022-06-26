const express = require('express')
const { check, validate } = require('../validator')
const autorController = require('../controllers/autor.controller')

const router = express.Router()

router.get('/', autorController.getAutores)
router.get('/:id',
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    autorController.getAutor
)
router.post('/',
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    validate,
    autorController.createAutor
)
router.put('/',
    check('autor_id', 'Autor ID é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ gt: 0 }),
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email é obrigatório e deve ser um email válido').notEmpty().bail().isEmail(),
    check('telefone', 'Telefone é obrigatório e deve ser um número válido com DDD').notEmpty().bail().isMobilePhone('pt-BR'),
    validate,
    autorController.updateAutor
)
router.delete('/:id', autorController.deleteAutor)

module.exports = router