<script lang="ts">
	import { onMount } from "svelte";
	import { page } from '$app/stores';
	import { goto } from "$app/navigation";

	onMount(() => {
		// client-side guard, for server-side guard, refer hooks.server.ts
		if (!$page?.data?.session?.user?.access_token) {
			goto('/hello');
		}
	})
</script>

<div class="content">
	<h1>Protected Page</h1>

	<p>
		This is a <a href="https://kit.svelte.dev" target="_blank">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>pnpm create svelte@latest</pre>

	<p>This is a protected page. Back to <a href="/hello">Home Page</a></p>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.6rem;
		line-height: 2rem;
		padding: 2rem;
	}
</style>
