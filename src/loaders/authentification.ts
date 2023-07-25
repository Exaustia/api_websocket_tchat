import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { isEmpty } from 'lodash';
import { getUserById } from '../schema/User/queries';

export const authentificationMiddleware = (req: Request) => {
	const token = req.headers['x-access-token'] as string;
	if (!token) {
		return false;
	}
	try {
		const resultJWT = jwt.verify(token, 'secretkey', (err: any, decoded: any) => {
			if (err) {
				return false;
			} else {
				return decoded.publicKey as string;
			}
		});
		return resultJWT as unknown as string | boolean;
	} catch (e) {
		return false;
	}
};

export const authentification_api = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['x-access-token'] as string;
	if (!token || token !== 'secretkey') {
		return res.status(401).json({
			message: 'Auth failed',
		});
	}

	next();
};

export const authentification = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({
				message: 'Auth failed',
			});
		}

		// Récupération de la clé secrète utilisée pour signer les tokens JWT dans NextAuth
		const secret = process.env.SECRET_JWT as string;

		// Décodage du token JWT avec la clé secrète
		const decodedToken = jwt.verify(token, secret);

		if (typeof decodedToken === 'string') {
			return res.status(401).json({
				message: 'Auth failed',
			});
		}

		// Vérification que le token est valide
		if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
			// Le token est valide et n'a pas expiré
			req.userId = decodedToken.userId;
			next();
		} else {
			// Le token est invalide ou a expiré
			return res.status(401).json({
				message: 'Auth failed',
			});
		}
	} catch (err) {
		// Une erreur s'est produite lors de la vérification du token JWT
		console.error(err);
		return res.status(401).json({
			message: 'Auth failed',
			error: err,
		});
	}
};

export const authentificationModerator = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({
				message: 'Auth failed',
			});
		}

		// Récupération de la clé secrète utilisée pour signer les tokens JWT dans NextAuth
		const secret = process.env.SECRET_JWT as string;

		// Décodage du token JWT avec la clé secrète
		const decodedToken = jwt.verify(token, secret);

		if (typeof decodedToken === 'string') {
			return res.status(401).json({
				message: 'Auth failed',
			});
		}

		// Vérification que le token est valide
		if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
			const user = await getUserById(decodedToken.userId);
			// Le token est valide et n'a pas expiré
			req.userId = decodedToken.userId;
			req.isModerator = user?.isModerator || false;
			next();
		} else {
			// Le token est invalide ou a expiré
			return res.status(401).json({
				message: 'Auth failed',
			});
		}
	} catch (err) {
		// Une erreur s'est produite lors de la vérification du token JWT
		console.error(err);
		return res.status(401).json({
			message: 'Auth failed',
			error: err,
		});
	}
};

export const authentificationWS = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.body.body.token;
		if (!token || token === 'public') {
			// alors c'est un public user qui se connecte
			return next();
		}

		const { valid, decoded } = verifyJWT(token);
		if (valid && decoded) {
			req.userId = decoded.userId;
			return next();
		}
		return res.status(401).json({
			message: 'Auth failed',
		});
	} catch (err) {
		// Une erreur s'est produite lors de la vérification du token JWT
		console.error(err);
		return res.status(401).json({
			message: 'Auth failed',
			error: err,
		});
	}
};

interface DecodedJWT {
	userId: string;
	iat: number;
	exp: number;
}

export function verifyJWT(token: string) {
	try {
		// Vérifiez la signature et décodez le token
		const decoded = jwt.verify(token, process.env.SECRET_JWT || '123456789') as DecodedJWT;

		// Vérifiez si le token est expiré
		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp && currentTime > decoded.exp) {
			return { valid: false, decoded: null };
		}

		// Le token est valide
		return { valid: true, decoded };
	} catch (error) {
		console.log(error);
		// Une erreur s'est produite lors de la vérification du token (p. ex. signature invalide)
		return { valid: false, decoded: null };
	}
}
