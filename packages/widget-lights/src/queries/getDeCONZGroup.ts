import gql from 'graphql-tag'

export const GET_DECONZ_GROUP_QUERY = gql`
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

export const UPDATE_DECONZ_GROUP_STATE = gql`
  mutation updateDeCONZGroupState($input: DeCONZGroupStateUpdateInput!) {
    updateDeCONZGroupState(input: $input) {
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

export const TOGGLE_DECONZ_GROUP_MUTATION = gql`
  mutation ToggleDeCONZGroup($id: String!) {
    updateDeCONZGroupState(id: $id, state: { toggle: true }) {
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
