import fetch from 'node-fetch'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

export class HeatPump {
  private username: string
  private password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  public async login() {
    const response = await fetch(`${CLOUD_URL}/Login/ClientLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: this.username,
        Password: this.password,
        Language: 0,
        AppVersion: APP_VERSION,
        Persist: true,
        CaptchaResponse: null,
      }),
    }).then(res => res.json())

    console.log(response)
  }
}
