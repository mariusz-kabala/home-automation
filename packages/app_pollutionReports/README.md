# PollutionReports (@home/pollution-reports)

![flow](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/pollutionReports/docs/flow.png)

Collects pollution reports from 2 providers:

- api.airvisual.com
- api.waqi.info

### MQTT Topics:

#### `airvisual/${city}`

```
{
    city: string
    state: string
    country: string
    location: {
        type: string,
        coordinates?: number[]
    },
    current: {
        weather: {
            ts: string
            tp: number
            pr: number
            hu: number
            ws: number
            wd: number
            ic: string
        },
        pollution: {
            ts: string
            aqius: number
            mainus: string
            aqicn: number
            maincn: string
        }
    }
}
```

#### `aqicnorg/${city}`

```
{
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
}
```
