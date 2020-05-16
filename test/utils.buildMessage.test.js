const assert = require('assert')
const buildMessage = require('../utils/buildMessage')

describe.only('utils - buildMessage', () => {
  describe('when received an entity & an action', () => {
    it('should return the proper message', () => {
      const result = buildMessage('movie', 'create')
      const expected = 'movie created'
      assert.strictEqual(result, expected)
    })
  })

  describe('when received an entity & actions is a list', () => {
    it('should return the entity in plural', () => {
      const result = buildMessage('movie', 'list')
      const expected = 'movies listed'
      assert.strictEqual(result, expected)
    })
  })
})