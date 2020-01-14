const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  sensorRules: {
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
    'pi2': [
      {
        field: 'TVOC',
        condition: 'gt',
        value: 300,
        level: 'high',
        alert: 'Alert: Pollution level in house is higher than 300 ppb'
      },
      {
        field: 'eCO2',
        condition: 'gt',
        value: 800,
        level: 'high',
        alert: 'Alert: CO2 level is higher than 800 ppm. Consider to open the windows'
      }
    ]
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
  },
  watchedDevices: [
    {
      device: 'home-srv',
      alertLevel: 'high'
    },
    {
      device: 'pi2',
      alertLevel: 'medium'
    },
    {
      device: 'piHAT',
      alertLevel: 'medium'
    },
    {
      device: 'rockrobo',
      alertLevel: 'medium'
    },
    {
      device: 'openwrt',
      alertLevel: 'medium'
    }
  ]
}
