<script context="module" lang="ts">
  import { client } from '../../lib/apollo'
  import { GET_DECONZ_GROUP } from '../../queries'

  export async function preload({ params }) {
    return {
      id: params.id,
      cache: await client.query({
        query: GET_DECONZ_GROUP,
        variables: {
          id: params.id,
        },
      }),
    }
  }
</script>

<script lang="ts">
  import { restore, query } from 'svelte-apollo'

  export let cache
  export let id

  restore(GET_DECONZ_GROUP, { data: cache.data })

  const group = query(GET_DECONZ_GROUP, {
    variables: {
      id,
    },
  })
</script>

{#if $group.loading}
  loading
{:else}
  <h1>{$group.data.deCONZGroup.name}</h1>
{/if}
