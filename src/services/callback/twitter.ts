import { Client, auth } from 'twitter-api-sdk';
import { getUserByTwitterId } from '../../schema/User/queries';
import { removeTwitterDataByUserId, updateTwitterDataByTwitterId } from '../../schema/User/update';

const twitterCallback = async ({ userId, code }: { userId: string; code: string }) => {
	try {
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

		authClient.generateAuthURL({
			code_challenge_method: 'plain',
			code_challenge: userId,
			state: userId,
		});

		const access_token = await authClient.requestAccessToken(code);
		if (!access_token || !access_token.token.access_token)
			throw new Error('Cannot get access token');

		const client = new Client(access_token.token.access_token);

		const userData = await client.users.findMyUser();
		if (!userData.data?.id) throw new Error('Cannot get user data');

		const userWithThisTwitterId = await getUserByTwitterId(userData.data?.id);
		if (userWithThisTwitterId) {
			await removeTwitterDataByUserId(userWithThisTwitterId.id);
		}

		await updateTwitterDataByTwitterId(userId, userData.data?.id, userData.data?.username);

		return userData;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default twitterCallback;
