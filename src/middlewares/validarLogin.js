const jwt = require('jsonwebtoken')
const knex = require('../config/conexao')

const verificarLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado!' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.HASH)

    const usuario = await knex('usuarios').where({ id }).first()

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado!' })
    }

    const { senha: _, ...dadosUsuario } = usuario

    req.usuario = dadosUsuario

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ mensagem: 'Sessão expirada' })
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ mensagem: 'Não autorizado!' })
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = verificarLogin
