const knex = require('../config/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body
  try {
    const usuario = await knex('usuarios').where({ email }).first()

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha)

    if (!senhaVerificada) {
      return res.status(400).json({ mensagem: 'Email e/ou senha inválidos' })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.HASH, { expiresIn: '1d' })

    const { senha: _, ...dadosUsuario } = usuario

    return res.status(200).json({ usuario: dadosUsuario, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = loginUsuario
