import { Request, Response } from 'express'
import { UsageModel, UsageCategory, UsageHistoryModel } from '@home/models'
import { checkSchema, validationResult } from 'express-validator'
import { findShellyDevice } from '../db'
import { logger } from '@home/logger'

export const turnOnPostValidation = checkSchema({
  id: {
    errorMessage: 'Id is required',
  },
  type: {
    errorMessage: 'Type is required',
  },
  name: {
    errorMessage: 'Name is required',
  },
  level: {
    isInt: true,
    toInt: true,
  },
})

async function turnOnPost(req: Request, res: Response) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id, type, name, room, level, category } = req.body

  try {
    await UsageModel.deleteMany({ id })
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  const usage = new UsageModel()
  usage.id = id
  usage.type = type
  usage.name = name
  usage.room = room
  usage.level = level
  usage.category = category

  try {
    usage.save()
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  return res.status(201).end()
}

async function turnOnGet(req: Request, res: Response) {
  const { id, relay } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).end()
  }

  const shelly = await findShellyDevice(id)

  if (!shelly) {
    return res.status(404).end()
  }

  try {
    await UsageModel.deleteMany({ id })
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  const usage = new UsageModel()
  usage.id = id
  usage.type = 'shelly'
  usage.name = shelly.label
  usage.room = shelly.room
  usage.level = shelly.level
  usage.category = UsageCategory.lights

  if (relay && relay !== '') {
    const parsedRelay = parseInt(`${relay}`, 10)

    usage.relay = isNaN(parsedRelay) ? undefined : parsedRelay
  }

  try {
    usage.save()
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  return res.status(201).end()
}

export function turnOn(req: Request, res: Response) {
  switch (req.method) {
    case 'GET':
      return turnOnGet(req, res)

    case 'POST':
      return turnOnPost(req, res)

    default:
      return res.status(405).end()
  }
}

export async function turnOff(req: Request, res: Response) {
  const { id } = req.query

  const usage = await UsageModel.findOne({ id })

  if (!usage) {
    return res.status(404).end()
  }

  const history = new UsageHistoryModel()

  history.type = usage.type
  history.name = usage.name
  history.id = usage.id
  history.room = usage.room
  history.level = usage.level
  history.category = usage.category
  history.start = usage.createdAt
  history.end = new Date()

  try {
    await Promise.all([UsageModel.deleteMany({ id }), history.save()])
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  return res.status(200).end()
}
