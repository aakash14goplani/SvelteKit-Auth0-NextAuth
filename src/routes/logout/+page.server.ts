import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	try {
		const session = await locals.getSession();
		if (session && !!session?.user?.access_token) {
			const tokenCall = await fetch('/hello/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('csrfToken', csrfToken);

			await fetch('/hello/auth/signout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});
		}
	} catch (e: any) {
		console.log('Exception thrown while auto-sign-out: ', e);
	}
}) satisfies PageServerLoad;
