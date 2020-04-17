import { Express, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '@home/logger'
import config from 'config'

import refreshTokenModel, { IRefreshToken } from '../models/refreshToken'
import { IUser } from '../models/user'
import { getJWTData } from '../helpers/authenticate'

export function initJWT(app: Express) {
  app.get('/auth/check', (req, res) => {
    const { token } = req.query

    if (!token && token === '') {
      return res.status(400).end()
    }

    jwt.verify(token as string, config.get<string>('secret'), err => {
      if (err) {
        logger.error(`Invalid token provided, JWT validation failed`)
        return res.status(401).end()
      }

      return res.status(200).end()
    })
  })

  app.post('/auth/refresh-token', (req: Request, res: Response, next: NextFunction) => {
    refreshTokenModel
      .findOne({ token: req.body.token && req.body.token.trim() })
      .populate('user')
      .then((token: IRefreshToken | null) => {
        if (!token || token.user === null) {
          res.status(401).json({ message: 'Token is invalid' })

          logger.log({
            message: `Someone tried to refresh token with invalid refreshToken (${req.body.token})`,
            level: 'warn',
            traceId: res.get('x-traceid'),
          })

          return
        }

        const newToken = jwt.sign(getJWTData(token.user as IUser), config.get<string>('secret'), {
          expiresIn: config.get<string>('tokenLife'),
        })

        res
          .cookie('accessToken', newToken, {
            maxAge: config.get<number>('tokenLife'),
          })
          .status(201)
          .json({
            accessToken: newToken,
          })

        logger.log({
          level: 'info',
          message: `Token was successfuly refresh using refreshToken ${req.body.token} for user ${token.user._id} (${token.user.email})`,
        })
      })
      .catch((err: Error) => {
        next(err)
      })
  })
}
