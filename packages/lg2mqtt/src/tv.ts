import lgtv2 from 'lgtv2'
import { publish, subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import config from 'config'

export class TV {
  private device: any
  private deviceName: string

  constructor(ipAddress: string, name: string) {
    this.device = lgtv2({
      url: `ws://${ipAddress}:3000`,
    })
    this.deviceName = name

    this.subscribeToDeviceEvents()
    this.subscribeToMqttEvents()
  }

  public disconnect() {
    this.device.disconnect()
    return Promise.resolve()
  }

  private subscribeToMqttEvents() {
    subscribe(`tv/${this.deviceName}/sendNotification`, (msg: { message: string }) => {
      this.device.request('ssap://system.notifications/createToast', { message: msg.message })
    })

    subscribe(`tv/${this.deviceName}/turnOff`, () => {
      this.device.request('ssap://system/turnOff', () => {
        this.device.disconnect()
      })
    })

    subscribe(`tv/${this.deviceName}/lunchApp`, (msg: { app: string }) => {
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
