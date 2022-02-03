/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url =
  'mongodb://marduk:aq6345voicemk@192.168.50.30:27017,192.168.50.217:27017,192.168.50.119:27017/?replicaSet=rs0'

module.exports.up = next => {
  let clientRef
  return MongoClient.connect(url)
    .then(client => {
      clientRef = client
      return client.db('home')
    })
    .then(db => {
      return db.createCollection('shelly')
    })
    .then(() => {
      clientRef.close()
      next()
    })
    .catch(err => {
      console.log(err)
      // clientRef.close()
      next()
    })
}

module.exports.down = next => {
  let clientRef
  return MongoClient.connect(url)
    .then(client => {
      clientRef = client
      return client.db()
    })
    .then(db => {
      db.collection('shelly').drop()
    })
    .then(() => {
      clientRef.close()
      next()
    })
    .catch(err => {
      console.log(err)
      //clientRef.close()
      next()
    })
}
