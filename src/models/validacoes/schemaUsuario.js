const joi = require('joi')

const usuarioSchema = joi.object({
  nome: joi.string().required().min(4).messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório',
    'string.min': 'O campo nome deve ter pelo menos 4 caracteres',
  }),
  email: joi.string().email().required().messages({
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
    'string.email': 'Informe um email válido',
  }),
  senha: joi.string().required().min(4).messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'O campo senha deve ter pelo menos 4 caracteres',
  }),
})

module.exports = usuarioSchema
