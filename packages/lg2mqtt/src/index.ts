import isReachable from 'is-reachable'
import config from 'config'

import { TV } from './tv'

const connected: {
  [key: string]: TV
} = {}

async function checkIfDevicesAreReachable() {
  const devices = config.get<{
    [name: string]: string
  }>('devices')

  for (const device of Object.keys(devices)) {
    const deviceIP = devices[device]
    const isDeviceReachable = await isReachable(`${deviceIP}:3000`, { timeout: 1000 })

    if (isDeviceReachable && !connected[device]) {
      connected[device] = new TV(deviceIP, device)
    } else if (!isDeviceReachable && connected[device]) {
      await connected[device].disconnect()

      delete connected[device]
    }
  }
}

setInterval(checkIfDevicesAreReachable, 30000)

checkIfDevicesAreReachable()

// var lgtv = lgtv2({
//   url: 'ws://192.168.0.151:3000',
// })

// lgtv.on('error', function(err: any) {
//   console.log(err)
// })

// lgtv.on('connect', function() {
//   console.log('connected')

//   lgtv.request('ssap://system.notifications/createToast', {
//     message: 'Temperatura w kuchni spadla pozniej 20C',
//     persistent: true,
//     noaction: false,
//   })
//   lgtv.request('ssap://com.webos.applicationManager/listLaunchPoints', (err: any, msg: any) => {
//     console.log(err)
//     for (const app of msg.launchPoints) {
//       console.log(`${app.id} ${app.title}`)
//     }
//   })
//   //   lgtv.request('ssap://com.webos.service.webappmanager')
//   //   lgtv.request('ssap://media.controls/play')
//   //   lgtv.request('ssap://system.launcher/launch', {id: 'hbogocev5'});
// })
