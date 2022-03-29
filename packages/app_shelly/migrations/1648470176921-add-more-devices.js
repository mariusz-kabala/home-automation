/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
'use strict'

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url =
  'mongodb://marduk:aq6345voicemk@192.168.50.30:27017,192.168.50.217:27017,192.168.50.119:27017/?replicaSet=rs0'

module.exports.up = function(next) {
  let clientRef
  return MongoClient.connect(url)
    .then(client => {
      clientRef = client
      return client.db('home')
    })
    .then(db => {
      const Collection = db.collection('shellies')

      return Collection.insertMany([
        {
          label: 'Siłownia, światło balkonowe',
          name: 'gym-balcony-light',
          type: 'shelly1',
          macAddress: 'E8:DB:84:D2:D0:36',
          deviceId: 'E8DB84D2D036',
          '@Home2IpAddress': '192.168.2.105',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Światło, garderoba siłownia',
          name: 'gym-wardrobe-lights',
          type: 'shelly1pm',
          macAddress: 'E0:98:06:A9:CE:85',
          deviceId: 'E09806A9CE85',
          '@Home2IpAddress': '192.168.2.182',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Światło, garderoba przy sypialni',
          name: 'bedroom-wardrobe-lights',
          type: 'shelly1pm',
          macAddress: 'E0:98:06:AA:0A:E2',
          deviceId: 'E09806AA0AE2',
          '@Home2IpAddress': '192.168.2.226',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Światło, balkon sypialnia',
          name: 'bedroom-balcony-lights',
          type: 'shelly1',
          macAddress: 'E8:DB:84:D2:87:10',
          deviceId: 'E8DB84D28710',
          '@Home2IpAddress': '192.168.2.240',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Światło, garderoba pokój gościnny',
          name: 'guest-room-wardrobe-lights',
          type: 'shelly1pm',
          macAddress: 'F4:CF:A2:E3:AF:A0',
          deviceId: 'F4CFA2E3AFA0',
          '@Home2IpAddress': '192.168.2.115',
          category: 'lights',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Światło, korytarz góra',
          name: 'lights-upstairs-corridor',
          type: 'shelly1',
          macAddress: 'E8:DB:84:D2:D6:6B',
          deviceId: 'E8DB84D2D66B',
          '@Home2IpAddress': '192.168.2.152',
          category: 'lights',
          room: 'guest-room',
          level: 1,
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
