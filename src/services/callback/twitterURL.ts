import { auth } from 'twitter-api-sdk';

const twitterURL = (userId: string) => {
	const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
	const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
	const uri = process.env.API_URL || 'http://localhost:8080';

	if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
		throw new Error('TWITTER_CLIENT_ID or TWITTER_CLIENT_SECRET is not defined');
	}

	const authClient = new auth.OAuth2User({
		client_id: TWITTER_CLIENT_ID,
		client_secret: TWITTER_CLIENT_SECRET,
		callback: uri + '/callback/twitter',
		scopes: ['tweet.read', 'users.read'],
	});

	const authUrl = authClient.generateAuthURL({
		code_challenge_method: 'plain',
		code_challenge: userId,
		state: userId,
	});

	return authUrl;
};

export default twitterURL;
