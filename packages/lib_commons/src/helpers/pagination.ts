import { Request } from 'express'

type Pagination = { limit: number; offset: number }

function validatePaginationParams(limit: any, offset: any): Pagination {
  if (!Number.isInteger(limit)) {
    limit = 25
  }

  if (!Number.isInteger(offset)) {
    offset = 0
  }

  if (limit > 50) {
    limit = 50
  }

  return {
    limit,
    offset,
  }
}

interface IPaginationParams {
  limit?: string
  offset?: string
}

export function getPaginationParams(req: Request<{}, {}, {}, IPaginationParams>): Pagination {
  const limit = parseInt(req.query.limit || '25', 10)
  const offset = parseInt(req.query.offset || '0', 10)

  return validatePaginationParams(limit, offset)
}

export function getPaginationParamsFromPostReq(req: Request): Pagination {
  const limit = parseInt(req.body.limit || '25', 10)
  const offset = parseInt(req.body.offset || '0', 10)

  return validatePaginationParams(limit, offset)
}
