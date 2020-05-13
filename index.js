const express = require('express')
const moviesApi = require('./routes/movies')
const PORT = require('./config').port

const app = express()

moviesApi(app)

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
