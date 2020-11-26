<script context="module" lang="ts">
  import { client } from '../../lib/apollo'
  import { GET_DECONZ_GROUP_QUERY, UPDATE_DECONZ_GROUP_STATE } from '../../queries'
  import SvgIcon from '../../components/IconLight.svelte'
  import Switch from '../../components/Switch.svelte'

  export async function preload({ params }) {
    return {
      id: params.id,
      cache: await client.query({
        query: GET_DECONZ_GROUP_QUERY,
        variables: {
          id: params.id,
        },
      }),
    }
  }
</script>

<script lang="ts">
  import { restore, query, mutation } from 'svelte-apollo'

  export let cache
  export let id

  let on = false

  const toggle = mutation(UPDATE_DECONZ_GROUP_STATE)

  let onChange = async () => {
    const res = await toggle({
      variables: {
        input: {
          id,
          toggle: true,
        },
      },
    })

    on = res.data.updateDeCONZGroupState.state.on
  }

  restore(GET_DECONZ_GROUP_QUERY, cache)

  const group = query(GET_DECONZ_GROUP_QUERY, {
    variables: {
      id,
    },
  })

  group.subscribe(res => {
    if (res.data) {
      on = res.data.deCONZGroup.state.on
    }
  })
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="wrapper">
  <SvgIcon fill={on ? 'yellow' : 'black'} />
  {#if $group.loading}
    loading
  {:else}
    <h1>{$group.data.deCONZGroup.name}</h1>
  {/if}
  <Switch bind:checked={on} {onChange} />
</div>
