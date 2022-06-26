const Sequelize = require('sequelize')
const db = require('../db')
const Cliente = require('./cliente.model')
const Livro = require('./livro.model')

const Venda = db.define('vendas', {
    venda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, { underscored: true })

Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' })
Venda.belongsTo(Livro, { foreignKey: 'livro_id' })

module.exports = Venda