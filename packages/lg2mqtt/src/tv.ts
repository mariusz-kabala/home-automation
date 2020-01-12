import lgtv2 from 'lgtv2'
import { publish, subscribe, ICallbackFunc } from '@home/mqtt'
import { logger } from '@home/logger'
import config from 'config'

export class TV {
  private device: any
  private deviceName: string
  private subscriptions: Array<() => void> = []

  constructor(ipAddress: string, name: string, clientKey: string) {
    this.device = lgtv2({
      url: `ws://${ipAddress}:3000`,
      clientKey,
      saveKey: () => null,
    })
    this.deviceName = name

    this.device.on('connect', () => {
      publish(`tv/${this.deviceName}/status`, { isOn: true })

      this.subscribeToDeviceEvents()
      this.subscribeToMqttEvents()
    })

    this.device.on('error', (err: Error) => {
      logger.log({
        level: 'error',
        message: `Connection error, device ${this.deviceName} / error: ${err}`,
        device: this.deviceName,
      })
      this.unsubscribe()
    })
  }

  public showAlert(message: string) {
    this.device.request('ssap://system.notifications/createToast', { message })
  }

  public disconnect() {
    return new Promise(resolve => {
      this.device.disconnect()
      this.unsubscribe()

      publish(`tv/${this.deviceName}/status`, { isOn: false }, { retain: true, qos: 0 })
      resolve()
    })
  }

  public runCommand(msg: any, topic: string) {
    const [, , command] = topic.split('/')

    switch (command) {
      case 'sendNotification':
        this.device.request('ssap://system.notifications/createToast', { message: msg.message })
        break

      case 'turnOff':
        this.device.request('ssap://system/turnOff', () => {
          this.device.disconnect()
        })
        break

      case 'lunchApp':
        const apps = config.get<{
          [key: string]: string
        }>('apps')
        const { app } = msg

        if (!apps[app]) {
          logger.log({
            level: 'error',
            message: `Unknown app ${app}, device: ${this.deviceName}. Can not lunch it`,
            device: this.deviceName,
          })
          return
        }

        this.device.request('ssap://system.launcher/launch', { id: apps[app] })
        break

      case 'setMute':
        this.device.request('ssap://audio/setMute', { mute: msg.mute })
        break

      case 'setVolume':
        this.device.request('ssap://audio/setVolume', { volume: msg.volume })
        break

      case 'volumeUp':
        this.device.request('ssap://audio/volumeUp')
        break

      case 'volumeDown':
        this.device.request('ssap://audio/volumeDown')
        break

      case 'play':
        this.device.request('ssap://media.controls/play')
        break

      case 'pause':
        this.device.request('ssap://media.controls/pause')
        break

      default:
        logger.log({
          level: 'error',
          message: `Not supported command ${topic}, ${JSON.stringify(msg)}`,
        })
        break
    }
  }

  private unsubscribe() {
    this.subscriptions.forEach(sub => sub())
  }

  private subscribe(topic: string, callback: ICallbackFunc) {
    this.subscriptions.push(subscribe(topic, callback))
  }

  private subscribeToMqttEvents() {
    this.subscribe(`tv/${this.deviceName}/+`, this.runCommand)
  }

  private subscribeToDeviceEvents() {
    this.device.on('ssap://audio/getVolume', this.onVolumeChange)
  }

  private onVolumeChange(err: Error | null, res: any) {
    if (err) {
      logger.log({
        level: 'error',
        message: `Error during volume reading, device: ${this.deviceName} ${err}`,
        device: this.deviceName,
      })
      return
    }

    if (res.changed.indexOf('volume') !== -1) {
      publish(`tv/${this.deviceName}/volume`, { volume: res.volume })
    }

    if (res.changed.indexOf('muted') !== -1) {
      publish(`tv/${this.deviceName}/muted`, { volume: res.muted })
    }
  }
}
