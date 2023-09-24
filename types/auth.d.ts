import type { DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {
	interface Session {
		user: DefaultSession['user'] & Partial<IUser>;
	}
}

interface IUser {
	access_token: string;
	exp: number;
	expires: string;
	expires_at: number;
	expires_in: number;
	iat: number;
	id_token: string;
	jti: string;
	provider: string;
	providerAccountId: string;
	scope: string;
	sub: string;
	token_type: string;
	type: string;
}
