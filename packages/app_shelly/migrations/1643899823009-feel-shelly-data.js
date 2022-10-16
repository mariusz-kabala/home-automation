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
      const Collection = db.collection('shellies')

      return Collection.insertMany([
        {
          label: 'Swiatło przed wejściem na schody',
          name: 'lights-before-stairs',
          deviceId: '8CAAB5775059',
          macAddress: '8C:AA:B5:77:50:59',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.109',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.109',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatlo, wejscie do garazu',
          name: 'lights-garage-entrance',
          deviceId: 'E868E78712F6',
          macAddress: 'E8:68:E7:87:12:F6',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.12',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, kotłownia',
          name: 'lights-boiler-room',
          deviceId: 'E8DB84D34021',
          macAddress: 'E8:DB:84:D3:40:21',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.134',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.134',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'boiler-room',
          level: 0,
        },
        {
          label: 'Swiatło, kinkiet salon',
          name: 'lights-sconce-living-room',
          deviceId: '40F520001CA3',
          macAddress: '40:F5:20:00:1C:A3',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.144',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.144',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatło, korytarz od gabinetu, głowne wejśce',
          name: 'lights-office-corridor',
          deviceId: 'E8DB84D2130C',
          macAddress: 'E8:DB:84:D2:13:0C',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.149',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.149',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, jadalnia',
          name: 'lights-dining-room',
          deviceId: '40F5202A2C6E',
          macAddress: '40:F5:20:2A:2C:6E',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.15',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.15',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'dining-room',
          level: 0,
        },
        {
          label: 'Światlo, lazienka przy sypialni',
          name: 'lights-bedroom-bathroom',
          deviceId: '40F52000567B',
          macAddress: '40:F5:20:00:56:7B',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.150',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.150',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'bedroom-bathroom',
          level: 1,
        },
        {
          label: 'Rolety, salon środek',
          name: 'roller-blinds-livingroom-cente',
          deviceId: '3C6105E5C2EB',
          macAddress: '3C:61:05:E5:C2:EB',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.153',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.153',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatło, pralnia',
          name: 'lights-laundry-room',
          deviceId: '8CAAB5773CCE',
          macAddress: '8C:AA:B5:77:3C:CE',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.157',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.157',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'laundry-room',
          level: 0,
        },
        {
          label: 'Rolety, gabinet',
          name: 'roller-blinds-office',
          deviceId: '40F520050189',
          macAddress: '40:F5:20:05:01:89',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.162',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.162',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'office',
          level: 0,
        },
        {
          label: 'Rolety, salon prawa',
          name: 'roller-blinds-living-room-right',
          deviceId: '40F52000C5A8',
          macAddress: '40:F5:20:00:C5:A8',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.175',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.175',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Rolety, garaż prawa',
          name: 'roller-blinds-garage-right',
          deviceId: '40F520002157',
          macAddress: '40:F5:20:00:21:57',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.177',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.177',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło, głowne wejście',
          name: 'lights-main-entry',
          deviceId: 'E8DB84D2AC31',
          macAddress: 'E8:DB:84:D2:AC:31',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.178',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.178',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'hall',
          level: 0,
        },
        {
          label: 'Swiatło, sypialnia',
          name: 'lights-bedroom',
          deviceId: '40F5202A87C0',
          macAddress: '40:F5:20:2A:87:C0',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.185',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.185',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Rolety, kotłownia',
          name: 'roller-blinds-boiler-room',
          deviceId: '40F52000DB0D',
          macAddress: '40:F5:20:00:DB:0D',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.214',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.214',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'boiler-room',
          level: 0,
        },
        {
          label: 'Swiatło, toaleta na dole',
          name: 'lights-toilet-downstairs',
          deviceId: '98CDAC1E2C37',
          macAddress: '98:CD:AC:1E:2C:37',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.22',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.22',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'toilet-downstairs',
          level: 0,
        },
        {
          label: 'Rolety, salon lewa',
          name: 'roller-blinds-livingroom-left',
          deviceId: '40F5200162E9',
          macAddress: '40:F5:20:01:62:E9',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.239',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.239',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Swiatla, strych',
          name: 'attic-lights',
          deviceId: 'F4CFA2E385B8',
          macAddress: 'F4:CF:A2:E3:85:B8',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.31',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.31',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'attic',
          level: 2,
        },
        {
          label: 'Swiatło, sufit podwieszany, salon',
          name: 'lights-livingroom',
          deviceId: '40F520018EB5',
          macAddress: '40:F5:20:01:8E:B5',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.32',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.32',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'living-room',
          level: 0,
        },
        {
          label: '1 Przycisk garazowy',
          name: 'garage-button-1',
          deviceId: '68C63AF9F049',
          macAddress: '68:C6:3A:F9:F0:49',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.52',
            },
          ],
          type: 'SHIX3-1',
          category: 'buttons',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Rolety, kuchnia',
          name: 'roller-blinds-kitchen',
          deviceId: '40F520018E78',
          macAddress: '40:F5:20:01:8E:78',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.6',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.6',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'kitchen',
          level: 0,
        },
        {
          label: 'Swiatlo, gabinet',
          name: 'lights-office',
          deviceId: '40F52001886E',
          macAddress: '40:F5:20:01:88:6E',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.69',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.69',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'office',
          level: 0,
        },
        {
          label: 'Swiatło, spiżarnia',
          name: 'lights-larder',
          deviceId: 'E8DB84D7A845',
          macAddress: 'E8:DB:84:D7:A8:45',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.71',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.71',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'larder',
          level: 0,
        },
        {
          label: 'Rolety, garaż lewa',
          name: 'roller-blinds-garage-left',
          deviceId: '40F5202A5501',
          macAddress: '40:F5:20:2A:55:01',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.75',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.75',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło, garaż',
          name: 'lights-garage',
          deviceId: 'E8DB84D27509',
          macAddress: 'E8:DB:84:D2:75:09',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.76',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.76',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'garage',
          level: 0,
        },
        {
          label: 'Swiatło pokój nad garażem 2',
          name: 'lights-above-garage-2',
          deviceId: '8CAAB5772D8F',
          macAddress: '8C:AA:B5:77:2D:8F',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.171',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.171',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'above-garage-room',
          level: 1,
        },
        {
          label: 'Swiatło, siłownia',
          name: 'lights-gym',
          deviceId: '98CDAC2BB6D8',
          macAddress: '98:CD:AC:2B:B6:D8',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.126',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.126',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Gościnny, rolety',
          name: 'blinds-guest-room',
          deviceId: '40F5202A4F51',
          macAddress: '40:F5:20:2A:4F:51',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.173',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Sypialnia, rolety',
          name: 'blinds-bedroom',
          deviceId: '40F52000D28A',
          macAddress: '40:F5:20:00:D2:8A',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.133',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.133',
            },
          ],
          type: 'SHSW-25',
          category: 'blinds',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Swiatło, pokój gościnny',
          name: 'lights-guest-room',
          deviceId: 'C45BBE6B8042',
          macAddress: 'C4:5B:BE:6B:80:42',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.249',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.249',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Kinkiet, kuchnia',
          name: 'kitchen-sconce',
          deviceId: 'E8DB84D35B9F',
          macAddress: 'E8:DB:84:D3:5B:9F',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.125',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.125',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'kitchen',
          level: 0,
        },
        {
          label: 'Winda projektora',
          name: 'projector-lift',
          deviceId: '40F520004C24',
          macAddress: '40:F5:20:00:4C:24',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.186',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.186',
            },
          ],
          type: 'SHSW-25',
          category: 'lift',
          room: 'living-room',
          level: 0,
        },
        {
          label: 'Główne światło w kuchni',
          name: 'kitchen-main-lights',
          deviceId: 'F4CFA2E3841C',
          macAddress: 'F4:CF:A2:E3:84:1C',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.172',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.172',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'kitchen',
          level: 0,
        },
        {
          label: 'Swiatło pokój nad garażem 1',
          name: 'lights-above-garage-1',
          deviceId: 'E09806AA060E',
          macAddress: 'E0:98:06:AA:06:0E',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.4',
            },
            {
              wifi: '@Home0',
              address: '192.168.50.4',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'above-garage-room',
          level: 1,
        },
        {
          label: 'Siłownia, światło balkonowe',
          name: 'gym-balcony-light',
          deviceId: 'E8DB84D2D036',
          macAddress: 'E8:DB:84:D2:D0:36',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.105',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Światło, garderoba siłownia',
          name: 'gym-wardrobe-lights',
          deviceId: 'E09806A9CE85',
          macAddress: 'E0:98:06:A9:CE:85',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.182',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'gym',
          level: 1,
        },
        {
          label: 'Światło, garderoba przy sypialni',
          name: 'bedroom-wardrobe-lights',
          deviceId: 'E09806AA0AE2',
          macAddress: 'E0:98:06:AA:0A:E2',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.226',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'bedroom-wardrobe',
          level: 1,
        },
        {
          label: 'Światło, balkon sypialnia',
          name: 'bedroom-balcony-lights',
          deviceId: 'E8DB84D28710',
          macAddress: 'E8:DB:84:D2:87:10',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.240',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'bedroom',
          level: 1,
        },
        {
          label: 'Światło, garderoba pokój gościnny',
          name: 'guest-room-wardrobe-lights',
          deviceId: 'F4CFA2E3AFA0',
          macAddress: 'F4:CF:A2:E3:AF:A0',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.115',
            },
          ],
          type: 'SHSW-PM',
          category: 'lights',
          room: 'guest-room',
          level: 1,
        },
        {
          label: 'Światło, korytarz góra',
          name: 'lights-upstairs-corridor',
          deviceId: 'E8DB84D2D66B',
          macAddress: 'E8:DB:84:D2:D6:6B',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.152',
            },
          ],
          type: 'SHSW-1',
          category: 'lights',
          room: 'corridor',
          level: 1,
        },
        {
          label: 'Swiatła, korytaz kolo pomieszczenia na wino',
          name: 'lights-front-of-wine-room',
          deviceId: '98CDAC1F10B6',
          macAddress: '98:CD:AC:1F:10:B6',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.59',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'corridor',
          level: 0,
        },
        {
          label: 'Przycisk, przed wejściem na schody',
          name: 'button-before-stairs',
          deviceId: 'E8DB84D32408',
          macAddress: 'E8:DB:84:D3:24:08',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.195',
            },
          ],
          type: 'SHIX3-1',
          category: 'buttons',
          room: 'corridor',
          level: 0,
        },
        {
          label: 'Przycisk, korytarz przy gabinecie',
          name: 'office-corridor-button',
          deviceId: 'E8DB84D25BED',
          macAddress: 'E8:DB:84:D2:5B:ED',
          networks: [
            {
              wifi: '@Home1',
              address: '192.168.1.176',
            },
          ],
          type: 'SHIX3-1',
          category: 'buttons',
          room: 'corridor',
          level: 0,
        },
        {
          label: 'Przycisk, korytarz przed pokojem nad garazem',
          name: 'btn-corridor-room-above-garage',
          deviceId: '98CDAC24EAAC',
          macAddress: '98:CD:AC:24:EA:AC',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.63',
            },
          ],
          type: 'SHIX3-1',
          category: 'buttons',
          room: 'corridor',
          level: 1,
        },
        {
          label: 'Swiatlo przed wejsciem do pokoju nad garazem',
          name: 'corridor-room-above-garage',
          deviceId: '40F5200026C4',
          macAddress: '40:F5:20:00:26:C4',
          networks: [
            {
              wifi: '@Home2',
              address: '192.168.2.140',
            },
            {
              wifi: '@Home1',
              address: '192.168.1.140',
            },
          ],
          type: 'SHSW-25',
          category: 'lights',
          room: 'corridor',
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
      db.collection('shellies').drop()
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
