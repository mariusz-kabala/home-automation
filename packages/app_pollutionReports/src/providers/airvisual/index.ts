import fetch from 'node-fetch'
import config from 'config'
import { v4 as uuid4 } from 'uuid'
import { publish } from '@home/mqtt'
import { logger } from '@home/logger'
import { Store } from '@home/commons'

import { IAirVisualResponse } from './types'

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

function publishAirVisual(response: IAirVisualResponse, city: string) {
  publish(`airvisual/${city}`, {
    ...response.data,
    traceid: uuid4(),
  })
}

export function getRunAirVisual(store: Store) {
  return async () => {
    const locations = config.get<{
      [city: string]: {
        city: string
        state: string
        country: string
      }
    }>('airVisualLocations')

    for (const city of Object.keys(locations)) {
      const location = locations[city]
      try {
        const results = await fetchAirVisualResults(location)

        if (results.status !== 'success') {
          logger.log({
            level: 'error',
            provider: 'airvisual',
            message: `Invalid AirVisual response ${JSON.stringify(results)}`,
          })
          continue
        }

        logger.log({
          level: 'info',
          message: `New report`,
          provider: 'airvisual',
        })

        publishAirVisual(results, city)

        store.set(`airvisual.${city.toLowerCase()}`, results)
        store.set(`${city.toLowerCase()}.airvisual`, results)
      } catch (err) {
        logger.log({
          level: 'error',
          provider: 'airvisual',
          message: `Error while fetching pollution report for ${JSON.stringify(location)}: ${JSON.stringify(err)}`,
        })
      }
    }
  }
}
