const Sequelize = require('sequelize')

const db = new Sequelize(
    process.env.DB_CON_STR,
    {
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: false
        },
        query: {
            raw: true
        }
    }
)

module.exports = db