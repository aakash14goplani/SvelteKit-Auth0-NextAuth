import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';

const config: SvelteKitAuthConfig = {
  providers: [{
    id: 'auth0',
    name: 'Auth0',
    type: 'oidc',
    clientId: 'm9wAwrjRgERFJNc0WxkDXkQUZ5BVeJTQ',
    clientSecret: '6-X5HgqJpzPGe87QlUjDB_0rMP7ql6EIp4LfNe15jOtcC0c2I4JoQivrkhWmYscC',
    issuer: 'https://dev-24ovxhwj2j6opsex.us.auth0.com/',
    wellKnown: 'https://dev-24ovxhwj2j6opsex.us.auth0.com/.well-known/openid-configuration'
  }],
  secret: 'cfc1bb18fc9ba615ea8a3f6db2df089c',
  debug: false,
  session: {
    updateAge: 900, // 15 mins
    maxAge: 1800 // 30 mins
  }
};

/**
 * Tracks user session on every network request. If session becomes null / times-out
 * redirects user to logout page
 */
 const userSessionInterceptor = (async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	const isSessionTimedOut = new Date(session?.expires || '') <= new Date();
	const isUserSessionUndefined = !session?.user;
	const isUrlAllowed = !['/', '/app/logout', '/app/about-us'].includes(
		event.url.pathname
	);

	if (isUrlAllowed && (isSessionTimedOut || isUserSessionUndefined)) {
		throw redirect(303, '/');
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(
	SvelteKitAuth(config) satisfies Handle,
	userSessionInterceptor
);