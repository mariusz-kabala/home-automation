<script context="module" lang="ts">
  import { client } from '../lib/apollo'
  import { GET_LIGHTS_QUERY } from '../queries'

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_LIGHTS_QUERY,
      }),
    }
  }
</script>

<script lang="ts">
  import successkid from 'images/successkid.jpg'
  import { restore, query } from 'svelte-apollo'

  export let cache

  restore(GET_LIGHTS_QUERY, { data: cache.data })

  const lights = query(GET_LIGHTS_QUERY, {
    // variables, fetchPolicy, errorPolicy, and others
  });
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
  <img alt="Success Kid" src={successkid} />
  <figcaption>Have fun with Sapper!</figcaption>
</figure>

{#if $lights.loading}
  Loading...
{:else if $lights.error}
  Error: {$lights.error.message}
{:else}
  <p>data is here</p>
{/if}
