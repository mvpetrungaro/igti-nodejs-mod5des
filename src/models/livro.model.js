const Sequelize = require('sequelize')
const db = require('../db')
const Autor = require('./autor.model')

const Livro = db.define('livros', {
    livro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { underscored: true })

Livro.belongsTo(Autor, { foreignKey: 'autor_id' })

module.exports = Livro