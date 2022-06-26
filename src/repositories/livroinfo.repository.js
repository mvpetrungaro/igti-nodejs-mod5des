const MongoClient = require('../mongodb')

async function getLivroInfo(id) {

    const client = MongoClient.getClient()

    try {
        await client.connect()
        
        return await client.db('igti-nodejs-mod5des').collection('livroinfo').findOne({
            livroId: id
        })
    } catch (err) {
        throw err
    } finally {
        await client.close()
    }
}

async function createLivroInfo(livroInfo) {

    const client = MongoClient.getClient()

    try {
        await client.connect()

        await client.db('igti-nodejs-mod5des').collection('livroinfo').insertOne(livroInfo)
    } catch (err) {
        throw err
    } finally {
        await client.close()
    }
}

async function updateLivroInfo(livroInfo) {

    const client = MongoClient.getClient()

    try {
        await client.connect()

        await client.db('igti-nodejs-mod5des').collection('livroinfo').updateOne({
            livroId: livroInfo.livroId
        }, {
            $set: {...livroInfo}
        })
    } catch (err) {
        throw err
    } finally {
        await client.close()
    }
}

async function deleteLivroInfo(livroId) {

    const client = MongoClient.getClient()

    try {
        await client.connect()

        await client.db('igti-nodejs-mod5des').collection('livroinfo').deleteOne({
            livroId
        })
    } catch (err) {
        throw err
    } finally {
        await client.close()
    }
}

module.exports = {
    getLivroInfo,
    createLivroInfo,
    updateLivroInfo,
    deleteLivroInfo
}