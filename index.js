const express = require('express')
const moviesApi = require('./routes/movies')
const PORT = require('./config').port

const { errorHandler, errorLogger } = require('./utils/middlewares/errors')

const app = express()

app.use(express.json())

moviesApi(app)

app.use(errorLogger)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
