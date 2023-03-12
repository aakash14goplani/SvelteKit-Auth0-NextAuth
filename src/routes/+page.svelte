<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	onMount(() => {
		if (data.session?.user) {
			// if user is logged-in redirect to root page
			goto('/app');
		}
	});
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
	<meta name='description' content='Authentication with SvelteKit Auth' />
</svelte:head>

<section class="generic-content">
	<h1>Authentication with Sveltekit Auth</h1>
	<div>
		<p>You're on Public (un-protected) page.</p>
		<p>Login to view contents of the home page.</p>
	</div>
</section>

<style lang="scss">
	.generic-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
