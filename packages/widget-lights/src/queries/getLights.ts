import gql from 'graphql-tag'

export const GET_LIGHTS_QUERY = gql`
  query GetLights {
    lights {
      name
      manufacturername
      modelid
      state {
        bri
        hue
        on
        colormode
      }
    }
  }
`
