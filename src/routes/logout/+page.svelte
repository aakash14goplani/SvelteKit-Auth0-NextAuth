<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(async () => {
		// Comment out till line 9-19 and uncomment line 21-28 if you want to log-out user from
		// Auth0 session layer as well!
		const isAppReloaded = sessionStorage.getItem('reloadApp');
		if (!isAppReloaded) {
			sessionStorage.setItem('reloadApp', 'true');
			window.location.reload();
		}
		if (!$page.data.session?.user?.access_token) {
			setTimeout(() => {
				goto('/');
				sessionStorage.removeItem('reloadApp');
			}, 5000);
		}
		
		/*
		const idToken = $page.data?.session?.user?.id_token as string;
		window.location.href =
			import.meta.env.VITE_ISSUER +
			`oidc/logout?post_logout_redirect_uri=${encodeURIComponent(
				window.location.origin
			)}&id_token_hint=${idToken}`;
		*/
	});
</script>

<div class="content">
	<h2>Server Side Flow - Logout</h2>

	<p>
		This page deals with server side sign-out. As soon as you land on this page, you'll should have
		been loged out. Redirecting you to home page...
	</p>
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
