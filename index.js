const express = require('express')
const bodyParser = require('body-parser')
const moviesApi = require('./routes/movies')
const userMoviesApi = require('./routes/userMovies')
const PORT = require('./config').port

const { errorHandler, errorWrapper, errorLogger } = require('./utils/middlewares/errors')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// ? Set movies routes
moviesApi(app)

// ? Set user movies routes
userMoviesApi(app)

// ? Handle 404 Not Found
app.use(notFoundHandler)

// ? Error Handling Middlewares
app.use(errorLogger)
app.use(errorWrapper)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
