const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')

class UsersService {
  constructor() {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async getUser({ email }) {
    const [ user ] = await this.mongoDB(this.collection, { email })
    return user
  }

  async createUser({ user }) {
    const { name, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = {
      name,
      email,
      password:  hashedPassword
    }

    const createdUserId = await this.mongoDB.create(this.collection, newUser)
    
    return createdUserId
  }

}

module.exports = UsersService