const Sequelize = require('sequelize')
const db = require('../db')

const Autor = db.define('autores', {
    autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored: true })

module.exports = Autor