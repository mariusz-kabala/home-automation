# @home/open-weather

Fetches forecast from `api.openweathermap.org` and publishes on MQTT

![flow](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/openWeather/docs/flow.png)

## MQTT TOPICS:

### Publishes:

- `forecast/${city}`; _payload:_

  ```
  {
      coord: {
          lon: number
          lat: number
      }
      weather: IWeather[]
      base: string
      main: {
          temp: number
          feels_like: number
          temp_min: number
          temp_max: number
          pressure: number
          humidity: number
      }
      visibility: number
      wind: {
          speed: number
          deg: number
      }
      clouds: {
          all: number
      }
      dt: number
      sys: {
          type: number
          id: number
          country: string
          sunrise: number
          sunset: number
      }
      timezone: number
      id: number
      name: string
      cod: number
      traceid?: string
  }
  ```
