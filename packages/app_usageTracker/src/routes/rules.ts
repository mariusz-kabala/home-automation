import { Request, Response } from 'express'
import { UsageRuleModel } from '@home/models'
import { logger } from '@home/logger'
import { Error } from 'mongoose'

export async function deviceRules(req: Request, res: Response) {
  const { id } = req.query

  if (!id) {
    return res.status(400).end()
  }

  try {
    const rules = await UsageRuleModel.find({ id })

    return res.status(200).json(rules)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function rules(_: Request, res: Response) {
  try {
    const rules = await UsageRuleModel.find({})

    return res.status(200).json(rules)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function createRule(req: Request, res: Response) {
  try {
    const rule = await UsageRuleModel.create(req.body)

    return res.status(201).json(rule.toObject())
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).json(err.errors)
    }

    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function deleteRule(req: Request, res: Response) {
  const { id } = req.query

  if (!id) {
    return res.status(400).end()
  }

  try {
    await UsageRuleModel.deleteOne({ _id: id })
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }

  return res.status(200).end()
}
