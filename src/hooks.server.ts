import type { Handle, HandleServerError } from '@sveltejs/kit';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';

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

export const handleError: HandleServerError = ({ error }) => {
	const message = 'Error caught in [server-hooks]: ' + (error as any)?.message;
	console.log(message);
	return { message };
};

export const handle = SvelteKitAuth(config) satisfies Handle;
