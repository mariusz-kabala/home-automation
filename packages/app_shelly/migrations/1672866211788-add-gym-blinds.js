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
          label: 'Silownia rolety',
          name: 'gym-blinds',
          deviceId: '98CDAC1F0226',
          macAddress: '98:CD:AC:1F:02:26',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.73',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'gym',
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

      return Collection.deleteOne({ name: 'lights-terrace' })
    })
    .then(() => {
      clientRef.close()
    })
    .catch(err => {
      console.log(err)
    })
}
