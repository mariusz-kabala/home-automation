import { Request, Response } from 'express'
import { UsageHistoryModel } from '@home/models'
import { logger } from '@home/logger'

function getTimeRange(query: { day?: string; month?: string; year?: string; from?: string; to?: string }) {
  const hasDate = query.day || query.month || query.year
  let from: Date | null = null
  let to: Date | null = null

  if (hasDate) {
    const now = new Date()
    const day = query.day ?? now.getDate()
    const month = query.month ?? now.getMonth() + 1
    const year = query.year ?? now.getFullYear()

    from = new Date(`${month}-${day}-${year}`)
    to = new Date(from.getTime() + 8.64e7) // from + 24h
  } else {
    if (query.from && typeof query.from === 'string' && query.from !== '') {
      from = new Date(query.from)
    }

    if (query.to && typeof query.to === 'string' && query.to !== '') {
      to = new Date(query.to)
    }
  }

  if (from && isNaN(from.getTime())) {
    from = null
  }

  if (to && isNaN(to.getTime())) {
    to = null
  }

  return { from, to }
}

export async function deviceHistory(req: Request, res: Response) {
  const { id } = req.query

  if (!id) {
    return res.status(400).end()
  }

  try {
    const history = await UsageHistoryModel.find({ id })

    if (!history) {
      return res.status(404).end()
    }

    return res.status(200).json(history)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}

export async function searchHistory(req: Request, res: Response) {
  const { id } = req.query

  const query: {
    id?:
      | {
          $in: string[]
        }
      | string
    start?: {
      $gte: Date
    }
    end?: {
      $lte: Date
    }
  } = {}

  if (id && Array.isArray(id) && id.length > 0) {
    query.id = {
      $in: id as string[],
    }
  } else if (id && typeof id === 'string' && id !== '') {
    query.id = id
  }

  const { from, to } = getTimeRange(req.query)

  if (from) {
    query.start = { $gte: from }
  }

  if (to) {
    query.end = { $lte: to }
  }

  try {
    const results = await UsageHistoryModel.find(query)

    return res.status(200).json(results)
  } catch (err) {
    logger.error(`Database error: ${err}`)
    return res.status(500).end()
  }
}
