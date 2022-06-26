const { MongoClient } = require('mongodb')

function getClient() {
    return new MongoClient(
        process.env.MONGODB_CON_STR,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}

module.exports = { getClient }