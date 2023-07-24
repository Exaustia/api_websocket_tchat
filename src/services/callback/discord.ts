import axios from 'axios';
import { getUserByDiscordId } from '../../schema/User/queries';
import { removeDiscordDataByUserId, updateDiscordDataByDiscordId } from '../../schema/User/update';

const discordCallback = async ({ code, userId }: { code: string; userId: string }) => {
	try {
		const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
		const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
		const URL = process.env.API_URL || 'http://localhost:8080';

		if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
			throw new Error('DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET is not defined');
		}

		const discordReponse = await axios('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: new URLSearchParams({
				client_id: DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				code,
				redirect_uri: `${URL}/callback/discord`,
				scope: 'identify',
			}),
		});

		const data = discordReponse.data;
		const accessToken = data.access_token;

		const userResponse = await axios('https://discord.com/api/users/@me', {
			method: 'GET',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		const user = userResponse.data;
		const { id, username } = user;

		const userWithThisDiscordId = await getUserByDiscordId(userId);
		if (userWithThisDiscordId) {
			await removeDiscordDataByUserId(userWithThisDiscordId.id);
		}

		await updateDiscordDataByDiscordId(userId, id, username);
		return user;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default discordCallback;
