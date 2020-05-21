const express = require('express')

const validationHandler = require('../utils/middlewares/validationHandler')

const UserMoviesService = require('../services/userMovies')
const { userIdSchema } = require('../utils/schemas/users')
const { movieIdSchema } = require('../utils/schemas/movies')
const { createUserMovieSchema, userMovieIdSchema } = require('../utils/schemas/userMovies')

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

  router.post('/', validationHandler(createUserMovieSchema), async (req, res, next) => {
    const { body: userMovie } = req

    try {
      const createdUserMovieId = await userMoviesService.createUserMovie({ userMovie })
      res.status(201).json({
        data: createdUserMovieId,
        message: 'Created User Movie'
      })
    } catch (error) {
      next(error)
    }

  })

  router.delete('/:userMovieId', validationHandler({userMovieId: userMovieIdSchema}, 'params'), async (req, res, next) => {
    const { userMovieId } = req.params

    try {
      const deletedUserMovieId = await userMoviesService.deleteUserMovie({ userMovieId })
      res.status(200).json({
        data: deletedUserMovieId,
        message: 'User Movie Deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = userMoviesApi