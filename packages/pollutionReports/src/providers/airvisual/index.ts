import fetch from 'node-fetch'
import config from 'config'
import uuid4 from 'uuid'
import { IAirVisualResponse } from './types'
import { publish } from '@home/mqtt'
import { logger } from '@home/logger'

async function fetchAirVisualResults({ city, state, country }: { city: string; state: string; country: string }) {
  const request = await fetch(
    `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${config.get<string>(
      'airvisualAPIKey',
    )}`,
  )

  if (!request.ok) {
    throw request
  }

  const data: IAirVisualResponse = await request.json()

  return data
}

function publishAirVisual(response: IAirVisualResponse) {
  publish(`airvisual/${response.data.city}`, {
    ...response.data,
    traceid: uuid4(),
  })
}

export async function runAirVisual() {
  const locations = config.get<
    {
      city: string
      state: string
      country: string
    }[]
  >('airVisualLocations')

  for (const location of locations) {
    try {
      const results = await fetchAirVisualResults(location)

      if (results.status !== 'success') {
        logger.log({
          level: 'error',
          message: `Invalid AirVisual response ${JSON.stringify(results)}`,
        })
        continue
      }
      publishAirVisual(results)
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  }
}
