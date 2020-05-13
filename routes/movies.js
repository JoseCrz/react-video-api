const express = require('express')
const { moviesMock } = require('../utils/mocks/movies')

const moviesApi = app => {
  const router = express.Router()

  app.use('/api/movies', router)

  router.get('/', async (req, res, next) => { // get movies list
    try {
      const movies = await Promise.resolve(moviesMock)
      res.status(200).json({
        data: movies,
        message: 'Movie List'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:movieId', async (req, res, next) => { // gets one movie
    try {
      const movie = await Promise.resolve(moviesMock[0])
      res.status(200).json({
        data: movie,
        message: 'Movie Retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => { // creates a movie
    try {
      const createdMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(201).json({
        data: createdMovieId,
        message: 'Movie Created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:movieId', async (req, res, next) => {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie Updated'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:movieId', async (req, res, next) => {
    try {
      const deletedMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: deletedMovieId,
        message: 'Movie deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = moviesApi