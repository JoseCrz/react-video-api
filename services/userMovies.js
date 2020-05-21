const MongoLib = require('../lib/mongo')

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies'
    this.mongoDB = new MongoLib()
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId }

    try {
      const userMovies = await this.mongoDB.getAll(this.collection, query)
      return userMovies || []
    } catch (error) {
      next(error)
    }
  }

  async createUserMovie({ userMovie }) {
    try {
      const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie)
      return createdUserMovieId
    } catch (error) {
      next(error)
    }
  }

  async deleteUserMovie({ userMovieId}) {
    try {
      const deletedUserMovieId = await this.mongoDB.delete(this.collection, userMovieId)
      return deletedUserMovieId
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserMoviesService