<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<div class="content">
	<h2>Client Side Flow</h2>

	<p>
		This page deals with client side sign-in and sign-out. For server-side, redirect to <a
			href="/hello/login">/login</a
		>.
	</p>

	<p>
		{#if $page.data.session?.user && Object.keys($page.data?.session?.user || {}).length}
			<div class="signedin">
				<span>Signed in as</span>
				<strong>Email: {$page.data.session.user.email}</strong>
				<strong>Name: {$page.data.session.user.name}</strong>
				<button on:click={() => signOut()} class="button">Sign out</button>
				<p>Since you are logged-in, you can access <a href="/hello/about-us">protected routes</a></p>
			</div>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<button
				on:click={() => signIn('auth0', { redirect: false }, { scope: 'api openid profile email' })}
			>
				<span>Sign In with Auth0</span>
			</button>
			<p>Since you are logged-out, you cannot access <a href="/hello/about-us">protected routes</a></p>
		{/if}
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

		.signedin {
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 2rem;
		}
	}
</style>
