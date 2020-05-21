const express = require('express')
const passport = require('passport')

const MoviesService = require('../services/movies')
const validationHandler = require('../utils/middlewares/validationHandler')
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler')
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies')
const cacheResponse = require('../utils/chacheResponse')
const { FIVE_MINUTES, SIXTY_MINUTES } = require('../utils/time')

// ? JWT Strategy
require('../utils/auth/strategies/jwt')

const moviesApi = app => {
  const router = express.Router()
  app.use('/api/movies', router)

  const moviesService = new MoviesService()
  
  // ? get movies list
  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (req, res, next) => { 
      cacheResponse(res, FIVE_MINUTES)
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
    }
  )

  // ? gets one movie
  router.get('/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => { 
      
      cacheResponse(res, SIXTY_MINUTES)
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
    }
  )
  
  // ? creates a movie
  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
    validationHandler(createMovieSchema),
    async (req, res, next) => { 
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
    }
  )

  // ? updates a movie
  router.put('/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    validationHandler({ movieId: movieIdSchema}, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => { 
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
    }
  )
  // ? deletes a movie
  router.delete('/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:movies']),
    validationHandler({ movieId: movieIdSchema}, 'params'),
    async (req, res, next) => { 
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
    }
  )
}

module.exports = moviesApi