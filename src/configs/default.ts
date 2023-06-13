import dotenv from 'dotenv';
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

export const version = 'v1.0.0_default';

// don't care because is devnet
export const encryPwd = '123456';

// export const SOLANA_URL = 'https://api.devnet.solana.com';

export const SOLANA_ENDPOINT =
	process.env.ENDPOINT;

export const SOL = '.0_default.solana.sol';

export const defaultMessageSignature = 'Im the owner of this Solana address';

export const API = {
	pfp: process.env.PFP_API || 'http://localhost:8090',
};

export const MATRICA_URL = 'https://api.matrica.io/v1';
export const MATRICA_API_KEY = '';
