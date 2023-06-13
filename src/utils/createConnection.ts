import { Connection } from '@solana/web3.js';

// export const createConnection = (config: ConfigType) => {
//   return new Connection(
//     config.clusterApiUrl || "https://api.devnet.solana.com",
//     "finalized"
//   );
// };
export const createConnection = () => {
	return new Connection('https://api.devnet.solana.com', 'finalized');
};
// TODO ATTENTION
