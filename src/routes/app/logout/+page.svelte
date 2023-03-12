<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log($page.data.session?.user)
		window.location.href = 'https://authjs.dev/';
	});
</script>

<svelte:head>
	<title>Sign out</title>
</svelte:head>

<p class="auth">You're about to be Signed Out...</p>

<style lang="scss">
	.auth {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
