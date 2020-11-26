import gql from 'graphql-tag'

export const GET_DECONZ_LIGHTS_QUERY = gql`
  query getDeCONZLights {
    deCONZLights {
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
