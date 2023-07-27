/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CLIENT_ID: string;
	readonly VITE_CLIENT_SECRET: string;
	readonly VITE_ISSUER: string;
	readonly VITE_WELL_KNOWN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
