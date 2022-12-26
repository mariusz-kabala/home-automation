import { Request, Response } from 'express'
import { UsageSkipModel } from '@home/models'
import { logger } from '@home/logger'
import { Error } from 'mongoose'

export async function deviceSkips(req: Request, res: Response) {
  const { id } = req.query

  if (!id || typeof id !== 'string' || id === '') {
    return res.status(400).end()
  }

  try {
    const skips = UsageSkipModel.find({ id })

    return res.status(200).json(skips)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function skips(_: Request, res: Response) {
  try {
    const skips = UsageSkipModel.find({})

    return res.status(200).json(skips)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function createSkip(req: Request, res: Response) {
  try {
    const skip = await UsageSkipModel.create(req.body)

    return res.status(201).json(skip.toObject())
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).json(err.errors)
    }

    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function deleteSkip(req: Request, res: Response) {
  const { id } = req.query

  if (!id || typeof id !== 'string' || id === '') {
    return res.status(400).end()
  }

  try {
    await UsageSkipModel.deleteOne({ _id: id })
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  return res.status(200).end()
}
