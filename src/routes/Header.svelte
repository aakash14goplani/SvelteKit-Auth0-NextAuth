<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	$: isSessionActive = $page.data.session?.user;

	/**
	 * Initiates signout process.
	 * Note: Be sure to revoke the token.
	 */
	async function handleLogout() {
		try {
			await signOut({ redirect: false, callbackUrl: `${window.location.origin}/app/logout` });
		} catch (e: any) {
			console.log('Exception while signout: ', e);
		}
	}
</script>

<header>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<nav>
		<ul>
			<li aria-current={($page.url.pathname === '/app' || $page.url.pathname === '/') ? 'page' : undefined}>
				<a href="{ isSessionActive ? '/app' : '/' }">Overview</a>
			</li>
			<li aria-current={$page.url.pathname === '/app/about-us' ? 'page' : undefined}>
				<a href="/app/about-us">About Us</a>
			</li>
			{#if isSessionActive}
				<li style="float:right" aria-current={undefined}>
					<a on:click={handleLogout}>Logout</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #3dcd58;
		
		li {
			float: left;

			a {
				display: block;
				color: white;
				text-align: center;
				padding: 14px 16px;
				text-decoration: none;
				cursor: pointer;
			}

			a:hover:not(.active) {
				background-color: darkgreen;
			}
		}
	}
</style>
