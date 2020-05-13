const express = require('express')

const PORT = require('./config').port

const app = express()

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.get('/json', (req, res) => {
  res.json({greet: 'How you doin?'})
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
