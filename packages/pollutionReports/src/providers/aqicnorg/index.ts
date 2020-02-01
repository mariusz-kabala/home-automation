import fetch from 'node-fetch'
import config from 'config'
import uuid4 from 'uuid'
import { publish } from '@home/mqtt'
import { logger } from '@home/logger'

import { IAqicnorgResponse } from './types'

async function fetchResults(location: string) {
  const request = await fetch(`http://api.waqi.info/feed/${location}/?token=${config.get<string>('aqicnorgAPIKey')}`)

  if (!request.ok) {
    throw request
  }

  const data: IAqicnorgResponse = await request.json()

  return data
}

function publishResults(response: IAqicnorgResponse, location: string) {
  publish(`aqicnorg/${location}`, {
    aqi: response.data.aqi,
    idx: response.data.idx,
    iaqi: {
      co: response.data.iaqi.co.v,
      no2: response.data.iaqi.no2.v,
      pm25: response.data.iaqi.pm25.v,
      so2: response.data.iaqi.so2.v,
      t: response.data.iaqi.t.v,
    },
    traceid: uuid4(),
  })
}

export async function runAqicnorg() {
  const locations = config.get<string[]>('aqicnorgLocations')

  for (const location of locations) {
    try {
      const results = await fetchResults(location)

      if (results.status !== 'ok') {
        logger.log({
          level: 'error',
          provider: 'aqicnorg',
          message: `Invalid Aqicnorg response ${JSON.stringify(results)}`,
        })
        continue
      }

      logger.log({
        level: 'info',
        message: `New report: ${JSON.stringify(results)}`,
        provider: 'aqicnorg',
      })

      publishResults(results, location)
    } catch (err) {
      logger.log({
        level: 'error',
        provider: 'aqicnorg',
        message: `Error while fetching pollution report for ${location}: ${err}`,
      })
    }
  }
}
