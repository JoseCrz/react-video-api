const express = require('express')

const validationHandler = require('../utils/middlewares/validationHandler')

const UserMoviesService = require('../services/userMovies')
const { userIdSchema } = require('../utils/schemas/users')
const { userIdSchema } = require('../utils/schemas/movies')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')

const userMoviesApi = app => {
  const router = express.Router()
  app.use('/api/user-movies', router)
  const userMoviesService = new UserMoviesService()

  router.get('/', validationHandler({userId: userIdSchema}, 'query'), async (req, res, next) => {
    const { userId } = req.query

    try {
      const userMovies = await userMoviesService.getUserMovies({ userId })
      res.status(200).json({
        data: userMovies,
        message: 'User Movies List'
      })
    } catch (error) {
      next(error)      
    }
  })
}

module.exports = userMoviesApi