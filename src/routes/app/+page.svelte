<script lang='ts'>
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Protected Page</title>
	<meta name='description' content='Svelte demo app' />
</svelte:head>

<section>
	<h1>Overview</h1>
	<p>You're now logged in!</p>
	{#if data.session?.user}
		<p>Customized Date to be displayed here...</p>
	{/if}
</section>

<style lang='scss'>
  section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;

    h1 {
      width: 100%;
    }
	}
</style>