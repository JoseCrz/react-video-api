const assert = require('assert')
const proxyquire = require('proxyquire')

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies.js', {
    '../services/movies': MoviesServiceMock
  })

  const request = testServer(route)

  describe('GET /movies', () => {
    it('should respond with status 200', done => {
      request.get('/api/movies').expect(200, done)
    })

    it('should respond with movies list', done => {
      request.get('/api/movies').end((error, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'Movie List'
        })

        done()
      })
    })

  })
})