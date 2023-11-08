const knex = require('../config/conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  try {
    const existeUsuario = await knex('usuarios').where({ email }).first()

    if (existeUsuario) {
      return res.status(400).json('Email já cadastrado')
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await knex('usuarios')
      .insert({ nome, email, senha: senhaCriptografada })
      .returning(['nome', 'email'])

    return res.status(201).json(usuario[0])
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const detalharPerfil = (req, res) => {
  return res.status(200).json(req.usuario)
}

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const { id, email: emailDoUsuarioLogado } = req.usuario

    const usuario = await knex('usuarios')
      .where({ email })
      .whereNot('email', emailDoUsuarioLogado)
      .first()

    if (usuario) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const dadosAtualizados = await knex('usuarios')
      .first()
      .where({ id })
      .update({ nome, email, senha: senhaCriptografada })
      .returning('*')

    const { senha: _, ...dadosUsuario } = dadosAtualizados[0]

    req.usuario = dadosUsuario

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  detalharPerfil,
  atualizarUsuario,
}
