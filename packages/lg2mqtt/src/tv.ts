import lgtv2 from 'lgtv2'
import { publish, subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import config from 'config'

export class TV {
  private device: any
  private deviceName: string
  private subscriptions: Array<(() => void)> = []

  constructor(ipAddress: string, name: string) {
    this.device = lgtv2({
      url: `ws://${ipAddress}:3000`,
    })
    this.deviceName = name

    this.device.on('connect', () => {
      publish(`tv/${this.deviceName}/status`, {isOn: true})

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

  public disconnect() {
    return new Promise(resolve => {
      this.device.disconnect()
      this.unsubscribe()

      publish(`tv/${this.deviceName}/status`, {isOn: false}, { retain: true, qos: 0 })
      resolve()
    })
  }

  private unsubscribe() {
    this.subscriptions.forEach(sub => sub())
  }

  private subscribe(topic: string, callback: Function) {
    this.subscriptions.push(subscribe(topic, callback))
  }

  private subscribeToMqttEvents() {
    this.subscribe(`tv/${this.deviceName}/sendNotification`, (msg: { message: string }) => {
      this.device.request('ssap://system.notifications/createToast', { message: msg.message })
    })

    this.subscribe(`tv/${this.deviceName}/turnOff`, () => {
      this.device.request('ssap://system/turnOff', () => {
        this.device.disconnect()
      })
    })

    this.subscribe(`tv/${this.deviceName}/lunchApp`, (msg: { app: string }) => {
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
    })

    this.subscribe(`tv/${this.deviceName}/setMute`, (msg: { mute: boolean}) => {
      this.device.request('ssap://audio/setMute', {mute: msg.mute})
    })

    this.subscribe(`tv/${this.deviceName}/setVolume`, (msg: { volume: number}) => {
      this.device.request('ssap://audio/setVolume', {volume: msg.volume})
    })

    this.subscribe(`tv/${this.deviceName}/volumeUp`, () => {
      this.device.request('ssap://audio/volumeUp')
    })

    this.subscribe(`tv/${this.deviceName}/volumeDown`, () => {
      this.device.request('ssap://audio/volumeDown')
    })

    this.subscribe(`tv/${this.deviceName}/play`, () => {
      this.device.request('ssap://media.controls/play')
    })

    this.subscribe(`tv/${this.deviceName}/pause`, () => {
      this.device.request('ssap://media.controls/pause')
    })
  }

  private subscribeToDeviceEvents() {
    this.device('ssap://audio/getVolume', this.onVolumeChange)
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
