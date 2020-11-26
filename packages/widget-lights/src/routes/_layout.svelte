<style>
  main {
    padding: 2em;
    margin: 0 auto;
  }
</style>

<main>
  <slot />
</main>

<script lang="ts">
	import { client } from '../lib/apollo'
	import { setClient } from 'svelte-apollo'
  
	setClient(client)
</script>
