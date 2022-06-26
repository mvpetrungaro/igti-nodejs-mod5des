const express = require('express')
const { check, validate } = require('../validator')
const vendaController = require('../controllers/venda.controller')

const router = express.Router()

router.get('/',
    check('cliente_id', 'Cliente ID deve ser um inteiro').optional().isInt(),
    check('livro_id', 'Livro ID deve ser um inteiro').optional().isInt(),
    check('autor_id', 'Autor ID deve ser um inteiro').optional().isInt(),
    validate,
    vendaController.getVendas
)
router.get('/:id',
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    vendaController.getVenda
)
router.post('/',
    check('data', 'Data é obrigatória e deve ser uma data no formato DD/MM/YYYY').notEmpty().bail().isDate({ format: 'DD/MM/YYYY' }),
    check('cliente_id', 'Cliente ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    check('livro_id', 'Livro ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    validate,
    vendaController.createVenda
)
router.put('/', vendaController.updateVenda)
router.delete('/:id', vendaController.deleteVenda)

module.exports = router