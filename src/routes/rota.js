const express = require('express')
const rota = express.Router()

const usuarioSchema = require('../models/validacoes/schemaUsuario')
const loginSchema = require('../models/validacoes/schemaLogin')

const { listarCategorias } = require('../controllers/categorias')
const { cadastrarUsuario, detalharPerfil, atualizarUsuario } = require('../controllers/usuarios')

const validarRequisicao = require('../middlewares/validarRequisicao')

const loginUsuario = require('../controllers/autenticarUsuario')
const verificarLogin = require('../middlewares/validarLogin')

rota.get('/categorias', listarCategorias)
rota.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rota.post('/login', validarRequisicao(loginSchema), loginUsuario)

rota.use(verificarLogin)

rota.get('/usuario', detalharPerfil)
rota.put('/usuario', validarRequisicao(usuarioSchema), atualizarUsuario)

module.exports = rota
