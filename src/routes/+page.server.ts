import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	let url = '';
	try {
		const session = await locals.getSession();
		if (!session?.user) {
			const tokenCall = await fetch('/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const params = new URLSearchParams();
      params.append('scope', 'api openid profile email');

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('csrfToken', csrfToken);

			const signInRequest = await fetch('/auth/signin/auth0? ' + params.toString(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});
			const signInResponse = await new Response(signInRequest.body).json();

			if (signInResponse?.url) {
				url = signInResponse.url;
			}
		}
	} catch (e: any) {
		console.log('Exception thrown while auto-sign-in: ', e);
	}

	if (url) {
		throw redirect(302, url);
	}
}) satisfies PageServerLoad;
