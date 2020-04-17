import fetch from 'node-fetch'
import config from 'config'

export async function authUser(jwt: string) {
  try {
    const res = await fetch(`${config.get('appDomain')}/auth/check?token=${jwt}`)
    const body = await res.text()
console.log(body)
console.log(`${config.get('appDomain')}/auth/check?token=${jwt}`)
    return res.status === 200
  } catch (err) {
    //   console.log(err)
    return false
  }
}
