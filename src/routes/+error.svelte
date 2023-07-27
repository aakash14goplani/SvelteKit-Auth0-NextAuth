<script lang="ts">
	import { onDestroy, onMount } from "svelte";
  import { goto } from '$app/navigation';

	/**
	 * If user enter any incorrect URL, generic error page will be triggered and will
	 * redirect user to root page
	 */

  let timeoutId: any;

	onMount(() => {
    timeoutId = setTimeout(() => goto('/'), 2000);
	});

  onDestroy(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  })
</script>

<svelte:head>
	<title>Error Page</title>
	<meta name="description" content="Error Page" />
</svelte:head>

<section>
	<h1>Generic Error Page</h1>
  <p>Redirecting you to home page...</p>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
