require('dotenv').config()

const supertest = require('supertest')
const db = require('../src/db')
const autorModel = require('../src/models/autor.model')
const livroModel = require('../src/models/livro.model')
const clienteModel = require('../src/models/cliente.model')
const vendaModel = require('../src/models/venda.model')

jest.setTimeout(60000)

const app = supertest('http://localhost:3000')

describe('Testes de integração da API', () => {

    let livro
    let cliente

    beforeAll(async () => {
        const clientePre = await clienteModel.findOne({
            where: {
                nome: 'Cliente Teste'
            }
        })

        const vendasPreRemovidas = clientePre ? await vendaModel.destroy({
            where: {
                cliente_id: clientePre.cliente_id
            }
        }) : 0

        const livrosPreRemovidos = await livroModel.destroy({
            where: {
                nome: 'Livro Teste'
            }
        })

        const autoresPreRemovidos = await autorModel.destroy({
            where: {
                nome: 'Autor Teste'
            }
        })

        const clientesPreRemovidos = await clienteModel.destroy({
            where: {
                nome: 'Cliente Teste'
            }
        })

        console.log({
            autoresPreRemovidos,
            livrosPreRemovidos,
            clientesPreRemovidos,
            vendasPreRemovidas
        })
    })

    test('Teste de disponibilidade', async () => {
        const res = await app.get('/')
        expect(res.statusCode).toBe(200)
    })

    test('Falhar autenticação', async () => {
        //When
        const res = await app.get('/clientes')

        //Then
        expect(res.statusCode).toBe(401)
    })

    test('Falhar criação de um autor', async () => {
        //When
        const res = await app.post('/autores')
        .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(res.statusCode).toBe(400)
    })

    test('Criar um autor', async () => {
        //Given
        let given = {
            nome: 'Autor Teste',
            email: 'autor.teste@domain.org',
            telefone: '+5521999999999',
        }

        //When
        const post = await app.post('/autores')
            .auth('admin', 'desafio-igti-nodejs')
            .send(given)

        //Then
        expect(post.statusCode).toBe(200)
        expect(post.body.autor_id).toBeTruthy()

        //When
        const get = await app.get(`/autores/${post.body.autor_id}`)
            .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(get.statusCode).toBe(200)
        expect(post.body).toMatchObject(get.body)

        autor = get.body
    })

    test('Falhar criação de um livro', async () => {
        //When
        const res = await app.post('/livros')
        .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(res.statusCode).toBe(400)
    })

    test('Criar um livro', async () => {
        //Given
        let given = {
            nome: 'Livro Teste',
            valor: 29.90,
            estoque: 1,
            autor_id: 2//autor.autor_id
        }

        //When
        const post = await app.post('/livros')
            .auth('admin', 'desafio-igti-nodejs')
            .send(given)

        //Then
        expect(post.statusCode).toBe(200)
        expect(post.body.livro_id).toBeTruthy()

        //When
        const get = await app.get(`/livros/${post.body.livro_id}`)
            .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(get.statusCode).toBe(200)
        expect(post.body).toMatchObject(get.body)

        livro = get.body
    })

    test('Falhar criação de um cliente', async () => {
        //When
        const res = await app.post('/clientes')
        .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(res.statusCode).toBe(400)
    })

    test('Criar um cliente', async () => {
        //Given
        let given = {
            nome: 'Cliente Teste',
            email: 'cliente.teste@domain.org',
            senha: 'Abobrinha@123',
            telefone: '+5521999999999',
            endereco: 'Rua 1, nº 2, apt 3'
        }

        //When
        const post = await app.post('/clientes')
            .auth('admin', 'desafio-igti-nodejs')
            .send(given)

        //Then
        expect(post.statusCode).toBe(200)
        expect(post.body.cliente_id).toBeTruthy()

        //When
        const get = await app.get(`/clientes/${post.body.cliente_id}`)
            .auth('admin', 'desafio-igti-nodejs')

        //Then
        expect(get.statusCode).toBe(200)
        expect(post.body).toMatchObject(get.body)

        cliente = get.body
    })

    test('Buscar um livro via cliente', async () => {
        //When
        const get = await app.get(`/livros/${livro.livro_id}`)
            .auth(cliente.email, 'Abobrinha@123')

        //Then
        expect(get.statusCode).toBe(200)
        expect(livro).toMatchObject(get.body)
    })

    test('Falhar criação de uma venda via cliente', async () => {
        //When
        const res = await app.post('/vendas')
        .auth(cliente.email, 'Abobrinha@123')

        //Then
        expect(res.statusCode).toBe(400)
    })

    test('Criar uma venda via cliente', async () => {
        //Given
        let given = {
            data: new Date().toLocaleDateString('pt-BR'),
            cliente_id: cliente.cliente_id,
            livro_id: livro.livro_id
        }

        //When
        const post = await app.post('/vendas')
            .auth(cliente.email, 'Abobrinha@123')
            .send(given)

        //Then
        expect(post.statusCode).toBe(200)
        expect(post.body.venda_id).toBeTruthy()

        //When
        const get = await app.get(`/vendas/${post.body.venda_id}`)
            .auth(cliente.email, 'Abobrinha@123')

        //Then
        expect(get.statusCode).toBe(200)
        expect(post.body).toMatchObject(get.body)

        venda = get.body
    })

    afterAll(async () => {
        const vendasPosRemovidas = cliente?.cliente_id ? await vendaModel.destroy({
            where: {
                cliente_id: cliente.cliente_id
            }
        }) : 0

        const livrosPosRemovidos = await livroModel.destroy({
            where: {
                nome: 'Livro Teste'
            }
        })

        const autoresPosRemovidos = await autorModel.destroy({
            where: {
                nome: 'Autor Teste'
            }
        })

        const clientesPosRemovidos = await clienteModel.destroy({
            where: {
                nome: 'Cliente Teste'
            }
        })

        console.log({
            autoresPosRemovidos,
            livrosPosRemovidos,
            clientesPosRemovidos,
            vendasPosRemovidas
        })

        db.close()
    })
})