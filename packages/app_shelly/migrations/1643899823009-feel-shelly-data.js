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
        {
          label: 'Rolety, salon środek',
          name: 'roller-blinds-livingroom-center',
          macAddress: '3C:61:05:E5:C2:EB',
          deviceId: '3C6105E5C2EB',
          '@Home0IpAddress': '192.168.50.153',
          '@Home1IpAddress': '192.168.1.153',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatło, pralnia',
          name: 'lights-laundry-room',
          macAddress: '8C:AA:B5:77:3C:CE',
          deviceId: '8CAAB5773CCE',
          '@Home0IpAddress': '192.168.50.157',
          '@Home1IpAddress': '192.168.1.157',
          category: 'lights',
          room: 'laundry-room',
          level: 0,
        },
        {
          label: 'Rolety, gabinet',
          name: 'roller-blinds-office',
          macAddress: '40:F5:20:05:01:89',
          deviceId: '40F520050189',
          '@Home0IpAddress': '192.168.50.162',
          '@Home1IpAddress': '192.168.1.162',
          category: 'blinds',
          room: 'office',
          level: 0,
        },
        {
          label: 'Rolety, salon prawa',
          name: 'roller-blinds-living-room-right',
          macAddress: '40:F5:20:00:C5:A8',
          deviceId: '40F52000C5A8',
          '@Home0IpAddress': '192.168.50.175',
          '@Home1IpAddress': '192.168.1.175',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Rolety, garaż prawa',
          name: 'roller-blinds-garage-right',
          macAddress: '40:F5:20:00:21:57',
          deviceId: '40F520002157',
          '@Home0IpAddress': '192.168.50.177',
          '@Home1IpAddress': '192.168.1.177',
          category: 'blinds',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło, głowne wejście',
          name: 'lights-main-entry',
          macAddress: 'E8:DB:84:D2:AC:31',
          deviceId: 'E8DB84D2AC31',
          '@Home0IpAddress': '192.168.50.178',
          '@Home1IpAddress': '192.168.1.178',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, sypialnia',
          name: 'lights-bedroom',
          macAddress: '40:F5:20:2A:87:C0',
          deviceId: '40F5202A87C0',
          '@Home0IpAddress': '192.168.50.185',
          '@Home1IpAddress': '192.168.1.185',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Rolety, kotłownia',
          name: 'roller-blinds-boiler-room',
          macAddress: '40:F5:20:00:DB:0D',
          deviceId: '40F52000DB0D',
          '@Home0IpAddress': '192.168.50.214',
          '@Home1IpAddress': '192.168.1.214',
          category: 'blinds',
          room: 'boiler-room',
          level: 0,
        },
        {
          label: 'Swiatło, toaleta na dole',
          name: 'lights-toilet-downstairs',
          macAddress: 'E8:68:E7:86:27:2F',
          deviceId: 'E868E786272F',
          '@Home0IpAddress': '192.168.50.22',
          '@Home1IpAddress': '192.168.1.22',
          category: 'lights',
          room: 'toilet-downstairs',
          level: 0,
        },
        {
          label: 'Rolety, salon lewa',
          name: 'roller-blinds-livingroom-left',
          macAddress: '40:F5:20:01:62:E9',
          deviceId: '40F5200162E9',
          '@Home0IpAddress': '192.168.50.239',
          '@Home1IpAddress': '192.168.1.239',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatlo, nad schodami',
          name: 'lights-upstairs',
          macAddress: 'F4:CF:A2:E3:85:B8',
          deviceId: 'F4CFA2E385B8',
          '@Home0IpAddress': '192.168.50.31',
          '@Home1IpAddress': '192.168.1.31',
          category: 'lights',
          room: 'stairs',
          level: 1,
        },
        {
          label: 'Swiatło, sufit podwieszany, salon',
          name: 'lights-livingroom',
          macAddress: '40:F5:20:01:8E:B5',
          deviceId: '40F520018EB5',
          '@Home0IpAddress': '192.168.50.32',
          '@Home1IpAddress': '192.168.1.32',
          category: 'lights',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatło, sypialnia + prysznic',
          name: 'lights-bedroom-shower',
          macAddress: '40:F5:20:01:63:37',
          deviceId: '40F520016337',
          '@Home0IpAddress': '192.168.50.37',
          '@Home1IpAddress': '192.168.1.37',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Garaż, przycisk',
          name: 'garage-button-1',
          macAddress: '68:C6:3A:F9:F0:49',
          deviceId: '68C63AF9F049',
          '@Home0IpAddress': '192.168.50.52',
          '@Home1IpAddress': '192.168.1.52',
          category: 'button',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Rolety, kuchnia',
          name: 'roller-blinds-kitchen',
          macAddress: '40:F5:20:01:8E:78',
          deviceId: '40F520018E78',
          '@Home0IpAddress': '192.168.50.6',
          '@Home1IpAddress': '192.168.1.6',
          category: 'blinds',
          room: 'kitchen',
          level: 0,
        },
        {
          label: 'Swiatło, wejście od garażu',
          name: 'lights-garage-entry',
          macAddress: 'E8:DB:84:D2:45:05',
          deviceId: 'E8DB84D24505',
          '@Home0IpAddress': '192.168.50.61',
          '@Home1IpAddress': '192.168.1.61',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatlo, gabinet',
          name: 'lights-office',
          macAddress: '40:F5:20:01:88:6E',
          deviceId: '40F52001886E',
          '@Home0IpAddress': '192.168.50.69',
          '@Home1IpAddress': '192.168.1.69',
          category: 'lights',
          room: 'office',
          level: 0,
        },
        {
          label: 'Swiatło, spiżarnia',
          name: 'lights-larder',
          macAddress: 'E8:DB:84:D7:A8:45',
          deviceId: 'E8DB84D7A845',
          '@Home0IpAddress': '192.168.50.71',
          '@Home1IpAddress': '192.168.1.71',
          category: 'lights',
          room: 'larder',
          level: 0,
        },
        {
          label: 'Rolety, garaż lewa',
          name: 'roller-blinds-garage-left',
          macAddress: '40:F5:20:2A:55:01',
          deviceId: '40F5202A5501',
          '@Home0IpAddress': '192.168.50.75',
          '@Home1IpAddress': '192.168.1.75',
          category: 'blinds',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło, garaż',
          name: 'lights-garage',
          macAddress: 'E8:DB:84:D2:75:09',
          deviceId: 'E8DB84D27509',
          '@Home0IpAddress': '192.168.50.76',
          '@Home1IpAddress': '192.168.1.76',
          category: 'lights',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło pokój nad garażem 2',
          name: 'lights-above-garage-2',
          macAddress: '8C:AA:B5:77:2D:8F',
          deviceId: '8CAAB5772D8F',
          '@Home0IpAddress': '192.168.50.171',
          '@Home1IpAddress': '192.168.1.171',
          category: 'lights',
          room: 'above-garage-room',
          level: 1,
        },
        {
          label: 'Swiatło, siłownia',
          name: 'lights-gym',
          macAddress: '98:CD:AC:2B:B6:D8',
          deviceId: '98CDAC2BB6D8',
          '@Home0IpAddress': '192.168.50.126',
          '@Home1IpAddress': '192.168.1.126',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Gościnny, rolety',
          name: 'blinds-guest-room',
          macAddress: '40:F5:20:2A:4F:51',
          deviceId: '40F5202A4F51',
          '@Home0IpAddress': '192.168.50.184',
          '@Home1IpAddress': '192.168.1.184',
          category: 'blinds',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Sypialnia, rolety',
          name: 'blinds-bedroom',
          macAddress: '40:F5:20:00:D2:8A',
          deviceId: '40F52000D28A',
          '@Home0IpAddress': '192.168.50.133',
          '@Home1IpAddress': '192.168.1.133',
          category: 'blinds',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Swiatło, pokój gościnny',
          name: 'lights-guest-room',
          macAddress: 'C4:5B:BE:6B:80:42',
          deviceId: 'C45BBE6B8042',
          '@Home0IpAddress': '192.168.50.249',
          '@Home1IpAddress': '192.168.1.249',
          category: 'lights',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Swiatło pokój nad garażem 1',
          name: 'lights-above-garage-1',
          macAddress: 'E0:98:06:AA:06:0E',
          deviceId: 'E09806AA060E',
          '@Home0IpAddress': '192.168.50.4',
          '@Home1IpAddress': '192.168.1.4',
          category: 'lights',
          room: 'above-garage-room',
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