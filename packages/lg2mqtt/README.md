# LG2MQTT

![flow](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/lg2mqtt/docs/flow.png 'Flow')

Bridge to communicate with LG Smart TVs

## Supported MQTT topics:

### Subscriptions:

- `home/tv/${deviceName}/sendNotification` - Display a notification tooltip on TV screen

  **Payload**:

  ```
  {
      message: string
  }
  ```

- `home/tv/${deviceName}/turnOff` - Turns off the TV (_no payload_)
- `home/tv/${deviceName}/lunchApp` - Lunch an app on TV
  **Payload**:
  ```
  {
      app: string
  }
  ```
  **Apps mapper:**
  ```
  {
      [mqttPayloadName]: [internalTVAppName]
      youtube: 'youtube.leanback.v4',
      hbo: 'hbogocev5',
      netflix: 'netflix',
      ipla: 'ipla',
      plex: 'cdp-30',
      hdmi1: 'com.webos.app.hdmi1',
      hdmi2: 'com.webos.app.hdmi2',
      hdmi3: 'com.webos.app.hdmi3',
  }
  ```
- `home/tv/${deviceName}/setMute` - Mutes / unmutes the TV
  **Payload**:
  ```
  {
      mute: boolean
  }
  ```
- `home/tv/${deviceName}/setVolume` - Changes the volume
  **Payload**:
  ```
  {
      volume: number
  }
  ```
- `home/tv/${deviceName}/volumeUp` - _No payload_
- `home/tv/${deviceName}/volumeDown` - _No payload_
- `home/tv/${deviceName}/play` - _No payload_
- `home/tv/${deviceName}/pause` - _No payload_

- Alerts

  Service subscribe to `alert/+` and uses TV notification system to display home automation alerts

### Publishes

- TV status

  Service publishes also `tv/${deviceName}/status` with payload:

  ```
  { isOn: true|false }
  ```

  whenever TV is being turn on/off

- Volume value

  `tv/${deviceName}/volume`; payload:

  ```
  { volume: number }
  ```

- Mute status

  `tv/${deviceName}/muted`; payload:

  ```
  { muted: boolean }
  ```

## Turning on TV sequence

![turnOn](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/lg2mqtt/docs/turnOn.png 'Turn on sequence')
