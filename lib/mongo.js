const { MongoClient, ObjectId } = require('mongodb')

const mongoCofing = require('../config').mongo

const NAME = mongoCofing.name
const USER = encodeURIComponent(mongoCofing.user)
const PASSWORD = encodeURIComponent(mongoCofing.password)
const HOST = mongoCofing.host

const URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(URI, { useNewUrlParser: true })
    this.dbName = NAME
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if (error) {
            reject(error)
          }

          console.log('[DB] Connected Succesfully!')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray()
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id)})
    })
  }

  create(collection, data) {
    return this.connect()
    .then(db => {
      return db.collection(collection).insertOne(data)
    })
    .then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect()
    .then(db => {
      db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data}, { upsert: true})
    })
    .then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect()
    .then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) })
    })
    .then(() => id)
  }

}

module.exports = MongoLib