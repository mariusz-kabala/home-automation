import gql from 'graphql-tag'

export const GET_DECONZ_GROUP = gql`
  query GetDeCONZGroup($id: String!) {
    deCONZGroup(id: $id) {
      name
      id
      state {
        bri
        hue
        on
        colormode
      }
      lights {
        name
      }
    }
  }
`
