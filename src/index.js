const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const rota = require('./routes/rota')

app.use(express.json())

app.use(rota)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
