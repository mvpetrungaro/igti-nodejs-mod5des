const supertest = require('supertest')

const app = supertest('http://localhost:3000')

describe('Testes de integração da API', () => {
    test('Teste de disponibilidade', async () => {
        const res = await app.get('/')
        console.log(res.body)

        expect(res.statusCode).toBe(200)
    })
})