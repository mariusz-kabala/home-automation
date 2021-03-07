import { Request, NextFunction, Response } from 'express'

export const redirectTo = (req: Request, _: Response, next: NextFunction) => {
  const { successRedirection, failureRedirection } = req.query

  if (!req.session) {
    return next()
  }

  if (successRedirection && successRedirection !== '') {
    req.session.redirectTo = successRedirection
  }

  if (failureRedirection && failureRedirection !== '') {
    req.session.failureRedirection = failureRedirection
  }

  next()
}
