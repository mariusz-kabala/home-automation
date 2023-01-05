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
      const Collection = db.collection('shellies')

      return Collection.insertMany([
        {
          label: 'Swiatło taras',
          name: 'lights-terrace',
          deviceId: 'E09806AA0563',
          macAddress: 'E0:98:06:AA:05:63',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.74',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.74',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'terrace',
          level: 0,
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
      const Collection = db.collection('shellies')

      return Collection.deleteOne({ name: 'lights-terrace' })
    })
    .then(() => {
      clientRef.close()
    })
    .catch(err => {
      console.log(err)
    })
}
