import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';

const config: SvelteKitAuthConfig = {
	providers: [
		{
			id: 'auth0',
			name: 'Auth0',
			type: 'oidc',
			clientId: import.meta.env.VITE_CLIENT_ID,
			clientSecret: import.meta.env.VITE_CLIENT_SECRET,
			issuer: import.meta.env.VITE_ISSUER,
			wellKnown: import.meta.env.VITE_WELL_KNOWN
		}
	],
	secret: '6022bea8-c8c8-4de1-89d9-3d8adae84802',
	debug: true,
	session: {
		maxAge: 1800 // 30 mins
	},
	callbacks: {
		jwt({ account, token }) {
			return { ...account, ...token };
		},
		session({ session, token }) {
			session.user = { ...session.user, ...token };
			return session;
		}
	}
};

/**
 * Tracks user session on every network request. If session becomes null / times-out
 * redirects user to logout page. Server-Side Guard
 */
const userSessionInterceptor = (async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	const isSessionTimedOut = new Date(session?.expires || '') <= new Date();
	const isUserSessionUndefined = !session?.user;
	const isUrlAllowed = !['/', '/logout', '/login'].includes(event.url.pathname);

	if (isUrlAllowed && (isSessionTimedOut || isUserSessionUndefined)) {
		throw redirect(303, '/');
	}

	return await resolve(event);
}) satisfies Handle;

export const handleError: HandleServerError = ({ error }) => {
	const message = 'Error caught in [server-hooks]: ' + (error as any)?.message;
	console.log(message);
	return { message };
};

export const handle = sequence(SvelteKitAuth(config) satisfies Handle, userSessionInterceptor);
