import { logger } from '@home/logger'
import jwt from 'jsonwebtoken'
import config from 'config'

import refreshTokenModel from '../models/refreshToken'
import { IUser } from '../models/user'

export function getJWTData(user: IUser) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  }
}

export async function authenticate(user: IUser) {
  const userData = getJWTData(user)

  const token = jwt.sign(userData, config.get<string>('secret'), {
    expiresIn: config.get<string>('tokenLife'),
  })

  const refreshToken = jwt.sign(userData, config.get<string>('refreshTokenSecret'), {
    expiresIn: config.get<string>('refreshTokenLife'),
  })

  try {
    await refreshTokenModel.create({
      token: refreshToken,
      user: user._id,
    })

    return {
      accessToken: token,
      refreshToken,
    }
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error during refresh token creation ${err}`,
    })
    return null
  }
}
