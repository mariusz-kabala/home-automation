/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const dotenv = require('dotenv')

dotenv.config()

const { MONGO_CONNECTION_STR } = process.env

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

module.exports.up = function(next) {
  let clientRef
  return MongoClient.connect(MONGO_CONNECTION_STR)
    .then(client => {
      clientRef = client
      return client.db('home')
    })
    .then(db => {
      const Collection = db.collection('dashboardscreens')

      return Collection.insertMany([
        {
          name: 'Dashboard',
          icon: 'home',
          section: 'Home',
          setup: JSON.stringify(null),
        },
        {
          name: 'Lighting',
          icon: 'bulb',
          section: 'Home',
          setup: JSON.stringify(null),
        },
        {
          name: 'Electricity',
          icon: 'thunder',
          section: 'Home',
          setup: JSON.stringify(null),
        },
        {
          name: 'Appliances',
          icon: 'app',
          section: 'Home',
          setup: JSON.stringify(null),
        },
        {
          name: 'Logs',
          icon: 'logs',
          section: 'Home',
          setup: JSON.stringify(null),
        },
      ])
    })

    .then(() => {
      clientRef.close()
      next()
    })
    .catch(err => {
      console.log(err)
      next()
    })
}

module.exports.down = function(next) {
  next()
}
