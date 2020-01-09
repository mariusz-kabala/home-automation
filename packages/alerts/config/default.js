const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  wsHost: process.env.WS_HOST,
  wsPort: process.env.WS_PORT,
  rules: {
    'Bathroom Motion Sensor': [
      {
        field: 'temperature',
        condition: 'lt',
        value: 2000,
        level: 'medium',
        alert: 'Warning: temperature in bathroom dropped below 20C',
        timeout: 3600000, // 1h
      },
      {
        field: 'temperature',
        condition: 'gt',
        value: 2400,
        level: 'medium',
        alert: 'Warning: temperature in bathroom is higher than 24C',
        timeout: 3600000, // 1h
      },
    ],
    'Kitchen Motion Sensor': [
      {
        field: 'temperature',
        condition: 'lt',
        value: 2000,
        level: 'medium',
        alert: 'Warning: temperature in kitchen dropped below 20C',
        timeout: 3600000, // 1h
      },
      {
        field: 'temperature',
        condition: 'gt',
        value: 2400,
        level: 'medium',
        alert: 'Warning: temperature in kitchen is higher than 24C',
        timeout: 3600000, // 1h
      },
    ],
    'Hallway Motion Sensor 1': [
      {
        field: 'temperature',
        condition: 'lt',
        value: 2000,
        level: 'medium',
        alert: 'Warning: temperature in hallway dropped below 20C',
        timeout: 3600000, // 1h
      },
      {
        field: 'temperature',
        condition: 'gt',
        value: 2400,
        level: 'medium',
        alert: 'Warning: temperature in hallway is higher than 24C',
        timeout: 3600000, // 1h
      },
    ],
    'Bedroom Multi Sensor': [
      {
        field: 'temperature',
        condition: 'lt',
        value: 2000,
        level: 'medium',
        alert: 'Warning: temperature in bedroom dropped below 20C',
        timeout: 3600000, // 1h
      },
      {
        field: 'temperature',
        condition: 'gt',
        value: 2400,
        level: 'medium',
        alert: 'Warning: temperature in bedroom is higher than 24C',
        timeout: 3600000, // 1h
      },
    ],
  },
  forecastRules: {
    'Szczecin': [
        {
            field: 'temp',
            condition: 'gt',
            value: 25,
            level: 'medium',
            alert: 'Warning: temperature in Szczecin is higher than 25C'
        },
        {
            field: 'temp',
            condition: 'lt',
            value: 0,
            level: 'medium',
            alert: 'Warning: temperature in Szczecin dropped below 0'
        },
    ],
    'Berlin': [
        {
            field: 'temp',
            condition: 'gt',
            value: 25,
            level: 'medium',
            alert: 'Warning: temperature in Berlin is higher than 25C'
        },
        {
            field: 'temp',
            condition: 'lt',
            value: 0,
            level: 'medium',
            alert: 'Warning: temperature in Berlin dropped below 0'
        },
    ]
  }
}
