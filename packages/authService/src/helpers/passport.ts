import passport from 'passport'
import { Express } from 'express'
import config from 'config'
import { logger } from '@home/logger'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as GitHubStrategy } from 'passport-github'

import userModel, { IUser } from '../models/user'

import { authenticate } from './authenticate'

const canLogin = (emailAddress: string): boolean => config.get<string[]>('users').includes(emailAddress)
const isAdmin = (emailAddress: string): boolean => config.get<string[]>('admins').includes(emailAddress)

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get<string>('googleConsumerKey'),
      clientSecret: config.get<string>('googleConsumerSecret'),
      callbackURL: `${config.get<string>('appDomain')}/auth/google/callback`,
    },
    (_accessToken, _refreshToken, profile, done) => {
      const { id, emails, displayName } = profile
      const email = Array.isArray(emails) && emails[0].value

      if (!email || !canLogin(email)) {
        return done(null, null)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(userModel as any).findOrCreate(
        {
          email,
        },
        {
          name: displayName,
          googleId: id,
          roles: isAdmin(email) ? ['admin'] : [],
        },
        async (err: Error | null, user: IUser, created: boolean) => {
          if (err) {
            return done(err, null)
          }

          if (!created && !user.googleId) {
            try {
              await userModel.updateOne({ _id: user._id }, { googleId: id })
            } catch (err) {
              logger.info(`Error during googleId update: ${err}`)
            }
          }
          done(null, user.toObject())
        },
      )
    },
  ),
)

passport.use(
  new GitHubStrategy(
    {
      clientID: config.get<string>('githubClientId'),
      clientSecret: config.get<string>('githubClientSecret'),
      callbackURL: `${config.get<string>('appDomain')}/auth/github/callback`,
      scope: ['user', 'user:email'],
    },
    (_accessToken, _refreshToken, profile, done) => {
      const { id, displayName, emails } = profile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const email = (emails || []).filter((email: any) => email.primary)

      if (!email && canLogin(email[0])) {
        return done(null)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(userModel as any).findOrCreate(
        {
          email: email[0].value,
        },
        {
          name: displayName,
          githubId: id,
          roles: isAdmin(email[0].value) ? ['admin'] : [],
        },
        async (err: Error | null, user: IUser, created: boolean) => {
          if (err) {
            return done(err)
          }

          if (!created && !user.githubId) {
            try {
              await userModel.updateOne({ _id: user._id }, { githubId: id })
            } catch (err) {
              logger.info(`Error during githubId update: ${err}`)
            }
          }

          done(null, user.toObject())
        },
      )
    },
  ),
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

export function initPassport(app: Express) {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),
  )

  app.get('/auth/google/callback', passport.authenticate('google'), async (req, res) =>
    res.json(await authenticate(req.user as IUser)).end(),
  )

  app.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['user', 'user:email'],
    }),
  )

  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) =>
    res.json(await authenticate(req.user as IUser)).end(),
  )
}
