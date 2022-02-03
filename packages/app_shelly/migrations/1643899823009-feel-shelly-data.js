/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
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
      const Collection = db.collection('shelly')

      return Collection.insertMany([
        {
          label: 'Swiatło przed wejściem na schody',
          name: 'lights-before-stairs',
          macAddress: '8C:AA:B5:77:50:59',
          deviceId: '8CAAB5775059',
          '@Home0IpAddress': '192.168.50.109',
          '@Home1IpAddress': '192.168.1.109',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, schody dół',
          name: 'lights-downstairs',
          macAddress: 'E8:68:E7:87:12:F6',
          deviceId: 'E868E78712F6',
          '@Home0IpAddress': '192.168.50.12',
          '@Home1IpAddress': '192.168.1.12',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, kotłownia',
          name: 'lights-boiler-room',
          macAddress: 'E8:DB:84:D3:40:21',
          deviceId: 'E8DB84D34021',
          '@Home0IpAddress': '192.168.50.134',
          '@Home1IpAddress': '192.168.1.134',
          category: 'lights',
          room: 'boiler-room',
          level: 0,
        },
        {
          label: 'Swiatło, kinkiet salon',
          name: 'lights-sconce-living-room',
          macAddress: '40:F5:20:00:1C:A3',
          deviceId: '40F520001CA3',
          '@Home0IpAddress': '192.168.50.144',
          '@Home1IpAddress': '192.168.1.144',
          category: 'lights',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatło, korytarz od gabinetu, głowne wejśce',
          name: 'lights-office-corridor',
          macAddress: 'E8:DB:84:D2:13:0C',
          deviceId: 'E8DB84D2130C',
          '@Home0IpAddress': '192.168.50.149',
          '@Home1IpAddress': '192.168.1.149',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, jadalnia',
          name: 'lights-dining-room',
          macAddress: '40:F5:20:2A:2C:6E',
          deviceId: '40F5202A2C6E',
          '@Home0IpAddress': '192.168.50.15',
          '@Home1IpAddress': '192.168.1.15',
          category: 'lights',
          room: 'dining-room',
          level: 0,
        },
      ])
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
