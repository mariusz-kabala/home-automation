import { Request, Response } from 'express'
import { ShellyModel } from '@home/models'
import { logger } from '@home/logger'
import { getPaginationParams } from '@home/commons'

export const find = {
  list(req: Request, res: Response) {
    const { limit, offset } = getPaginationParams(req)

    ShellyModel.paginate(
      {},
      {
        offset,
        limit,
      },
      (err, result) => {
        if (err) {
          logger.log({
            level: 'error',
            message: `Database error: ${err}`,
          })

          return res.status(500).end()
        }

        res.status(200).json(result)
      },
    )
  },
}
