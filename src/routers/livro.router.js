const express = require('express')
const { check, validate } = require('../validator')
const livroController = require('../controllers/livro.controller')

const router = express.Router()

router.get('/',
    check('autor_id', 'Autor ID deve ser um inteiro').optional().isInt(),
    validate,
    livroController.getLivros
)
router.get('/:id',
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    livroController.getLivro
)
router.post('/',
    check('nome', 'Nome é obrigatório').notEmpty(),
    check('valor', 'Valor é obrigatório e deve ser um número positivo').notEmpty().bail().isFloat({ min: 0 }),
    check('estoque', 'Estoque é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ min: 0 }),
    check('autor_id', 'Autor ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    validate,
    livroController.createLivro
)
router.put('/',
    check('livro_id', 'Livro ID é obrigatório e deve ser um inteiro').notEmpty().bail().isInt(),
    check('valor', 'Valor é obrigatório e deve ser um número positivo').notEmpty().bail().isFloat({ min: 0 }),
    check('estoque', 'Estoque é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ min: 0 }),
    validate,
    livroController.updateLivro
)
router.delete('/:id', livroController.deleteLivro)

router.post('/:id/info',
    check('id', 'ID deve ser um inteiro').isInt(),
    check('descricao', 'Descrição é obrigatória').notEmpty(),
    check('paginas', 'Páginas é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ gt: 0 }),
    check('editora', 'Editora é obrigatória').notEmpty(),
    validate,
    livroController.createLivroInfo
)
router.put('/:id/info',
    check('id', 'ID deve ser um inteiro').isInt(),
    check('descricao', 'Descrição é obrigatória').notEmpty(),
    check('paginas', 'Páginas é obrigatório e deve ser um inteiro positivo').notEmpty().bail().isInt({ gt: 0 }),
    check('editora', 'Editora é obrigatória').notEmpty(),
    validate,
    livroController.updateLivroInfo
)
router.delete('/:id/info',
    check('id', 'ID deve ser um inteiro').isInt(),
    validate,
    livroController.deleteLivroInfo
)

router.post('/:id/avaliacao',
    check('id', 'ID deve ser um inteiro').isInt(),
    check('nome', 'Nome é obrigatória').notEmpty(),
    check('nota', 'Nota é obrigatória e deve ser um inteiro positivo de 0 a 10').notEmpty().bail().isInt({ min: 0, max: 10 }),
    check('avaliacao', 'Avaliação é obrigatória').notEmpty(),
    validate,
    livroController.createAvaliacao
)
router.delete('/:id/avaliacao/:indice',
    check('id', 'ID deve ser um inteiro').isInt(),
    check('indice', 'Índice deve ser um inteiro positivo').isInt({ min: 0 }),
    validate,
    livroController.deleteAvaliacao
)

module.exports = router