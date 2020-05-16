const express = require('express')
const MoviesService = require('../services/movies')
const validationHandler = require('../utils/middlewares/validationHandler')
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies')

const moviesApi = app => {
  const router = express.Router()
  app.use('/api/movies', router)

  const moviesService = new MoviesService()

  router.get('/', async (req, res, next) => { // get movies list
    const { tags } = req.query

    try {
      // throw new Error('Something went horribly wrong')
      const movies = await moviesService.getMovies({ tags })
      res.status(200).json({
        data: movies,
        message: 'Movie List'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => { // gets one movie
    const { movieId } = req.params
    
    try {
      const movie = await moviesService.getMovie({ movieId })
      
      res.status(200).json({
        data: movie,
        message: 'Movie Retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validationHandler(createMovieSchema), async (req, res, next) => { // creates a movie
    const { body: movie } = req
    
    try {
      const createdMovieId = await moviesService.createMovie({ movie })
      
      res.status(201).json({
        data: createdMovieId,
        message: 'Movie Created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:movieId', validationHandler({ movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => { // updates a movie
    const { movieId } = req.params
    const { body: movie } = req
    
    try {
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie })
      
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie Updated'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema}, 'params'), async (req, res, next) => { // deletes a movie
    const { movieId } = req.params

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId })
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