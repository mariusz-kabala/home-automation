import { Request, Response } from 'express'
import { ShellyModel, Room, ShellyCategory, ShellyType } from '@home/models'
import { logger } from '@home/logger'
import { getPaginationParams, IPaginationParams } from '@home/commons'
import { parseSearchQuery, ISearchQueryParams, ISearchParams } from '../helpers/searchQuery'

type IFindParams = ISearchQueryParams & IPaginationParams

function searchDB({ query, limit, offset }: { query: ISearchParams; limit: number; offset: number }, res: Response) {
  ShellyModel.paginate(
    query,
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
}

export const find = {
  list(req: Request, res: Response) {
    const { limit, offset } = getPaginationParams(req)

    return searchDB({ query: {}, offset, limit }, res)
  },
  find(req: Request<{}, {}, {}, IFindParams>, res: Response) {
    const query = parseSearchQuery(req)
    const { limit, offset } = getPaginationParams(req)

    return searchDB({ query, offset, limit }, res)
  },
  room(req: Request<{ room: Room }, {}, {}, IFindParams>, res: Response) {
    const { room } = req.params
    const query = parseSearchQuery(req)
    const { limit, offset } = getPaginationParams(req)

    query.room = room

    return searchDB({ query, offset, limit }, res)
  },
  category(req: Request<{ category: ShellyCategory }, {}, {}, IFindParams>, res: Response) {
    const { category } = req.params
    const query = parseSearchQuery(req)
    const { limit, offset } = getPaginationParams(req)

    query.category = category

    return searchDB({ query, offset, limit }, res)
  },
  type(req: Request<{ type: ShellyType }, {}, {}, IFindParams>, res: Response) {
    const { type } = req.params
    const query = parseSearchQuery(req)
    const { limit, offset } = getPaginationParams(req)

    query.type = type

    return searchDB({ query, offset, limit }, res)
  },
}
