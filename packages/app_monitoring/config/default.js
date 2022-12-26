const dotenv = require('dotenv')
dotenv.config()

const { HIK_USERNAME, HIK_PASSWORD } = process.env

module.exports = {
  hikvision: {
    host: '192.168.50.154',
    port: 554,
    username: HIK_USERNAME,
    password: HIK_PASSWORD,
    channels: [
      {
        id: '201',
        name: 'Main Gate left',
      },
      {
        id: '601',
        name: 'Main Gate right',
      },
      {
        id: '801',
        name: 'Servers Room',
      },
      {
        id: '401',
        name: 'Garage',
      },
      {
        id: '501',
        name: 'Garden right',
      },
      {
        id: '701',
        name: 'Garden left',
      },
      {
        id: '301',
        name: 'Heat Pump',
      },
    ],
  },
}
