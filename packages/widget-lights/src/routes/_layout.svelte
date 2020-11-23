<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<script lang="ts">
	import Nav from '../components/Nav.svelte'
	import { client } from '../lib/apollo'
	import { setClient } from 'svelte-apollo'
  
	setClient(client)
  
	export let segment: string
</script>
