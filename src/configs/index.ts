/* eslint-disable import/no-dynamic-require */

import assign from 'lodash/assign';
import * as defaults from './default';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.APP_ENV}` });

const { APP_ENV } = process.env;
let envConfig = {};
try {
	envConfig = APP_ENV ? require(`./${APP_ENV}.ts`) : {};
} catch (e) {
	if (process.env.APP_ENV !== 'production') console.log('e', e);
	console.error(`config_not_found : /configs/${APP_ENV}.ts`);
}

export default assign({}, defaults, envConfig);
