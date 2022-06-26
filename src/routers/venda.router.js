const express = require('express')
const { check, validate } = require('../validator')
const vendaController = require('../controllers/venda.controller')
const authControler = require('../controllers/auth.controller')

const router = express.Router()

router.get('/',
    authControler.authorize('admin', 'cliente'),
    check('cliente_id', 'Cliente ID deve ser um inteiro').optional().isInt(),
    check('livro_id', 'Livro ID deve ser um inteiro').optional().isInt(),
    check('autor_id', 'Autor ID deve ser um inteiro').optional().isInt(),
    validate,
    authControler.authorizeOwnership,
    vendaController.getVendas
)
router.get('/:id',
    authControler.authorize('admin', 'cliente'),
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    vendaController.getVenda
)
router.post('/',
    authControler.authorize('admin', 'cliente'),
    check('data', 'Data é obrigatória e deve ser uma data no formato DD/MM/YYYY').notEmpty().bail().isDate({ format: 'DD/MM/YYYY' }),
    check('cliente_id', 'Cliente ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    check('livro_id', 'Livro ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    validate,
    authControler.authorizeOwnership,
    vendaController.createVenda
)
router.put('/',
    authControler.authorize('admin'),
    vendaController.updateVenda
)
router.delete('/:id',
    authControler.authorize('admin'),
    vendaController.deleteVenda
)

module.exports = router