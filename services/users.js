const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')

class UsersService {
  constructor() {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async getUser({ email }) {
    try {
      const [ user ] = await this.mongoDB.getAll(this.collection, { email })
      return user
      
    } catch (error) {
      console.log('[USERS SERVICE ERROR]:', error)
    }
  }

  async createUser({ user }) {
    const { name, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = {
      name,
      email,
      password: hashedPassword
    }

    const createdUserId = await this.mongoDB.create(this.collection, newUser)
    
    return createdUserId
  }

  async getOrCreateUser({ user }) {
    const queriedUser  = await this.getUser({ email: user.email })

    if (queriedUser) {
      return queriedUser
    }

    await this.createUser({ user })
    const createdUser = await this.getUser({ email: user.email })
    return createdUser
  }

}

module.exports = UsersService