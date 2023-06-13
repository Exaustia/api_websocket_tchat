import dotenv from 'dotenv';
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const version = 'v1.0.0_prod';
