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
          label: 'Swiatło sypialnia prysznic',
          name: 'lights-bedroom-shower',
          deviceId: '40F520016337',
          macAddress: '40:F5:20:01:63:37',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.37',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.37',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'bedroom',
          level: 1,
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

      return Collection.deleteOne({ name: 'lights-bedroom-shower' })
    })
    .then(() => {
      clientRef.close()
    })
    .catch(err => {
      console.log(err)
    })
}
