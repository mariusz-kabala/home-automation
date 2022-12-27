/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
'use strict'

const dotenv = require('dotenv')
const mongodb = require('mongodb')

dotenv.config()

const MongoClient = mongodb.MongoClient
const { MONGO_CONNECTION_STR } = process.env

module.exports.up = function() {
  let clientRef
  return MongoClient.connect(MONGO_CONNECTION_STR)
    .then(client => {
      clientRef = client
      return client.db('home')
    })
    .then(db => {
      const Collection = db.collection('usagerules')

      return Collection.insertMany([
        {
          id: 'lights-office-corridor',
          max: 5,
          after: 'sunrise',
          before: 'sunset',
        },
        {
          id: 'lights-office-corridor',
          max: 15,
          after: 'sunset',
          before: 'sunrise',
        },
      ])
    })
    .then(() => {
      clientRef.close()
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports.down = function() {
  let clientRef
  return MongoClient.connect(url)
    .then(client => {
      clientRef = client
      return client.db()
    })
    .then(db => {
      const Collection = db.collection('usagerules')

      return Collection.deleteMany({ id: 'lights-office-corridor' })
    })
    .then(() => {
      clientRef.close()
    })
    .catch(err => {
      console.log(err)
    })
}
