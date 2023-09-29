<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="content">
	<h2>Server Side Flow - Login</h2>

	<p>
		This page deals with server side sign-in. As soon as you land on this page, you'll be
		authenticated. For server-side logout, redirect to <a href="/hello/logout">/logout</a>.
	</p>

	<p>
		{#if $page.data.session?.user && Object.keys($page.data?.session?.user || {}).length}
			<div class="signedin">
				<span>Signed in as</span>
				<strong>Email: {$page.data.session.user.email}</strong>
				<strong>Name: {$page.data.session.user.name}</strong>
			</div>
		{/if}
	</p>

	<p>next-auth.session-token cookie is getting created on login!</p>
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
