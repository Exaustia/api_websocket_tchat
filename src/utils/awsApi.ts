import aws from 'aws-sdk';

let agm: aws.ApiGatewayManagementApi | null;

export const apiGatewayManagementApi = () => {
	if (agm) {
		return agm;
	}

	agm = new aws.ApiGatewayManagementApi({
		endpoint: '7b71b72exg.execute-api.us-east-1.amazonaws.com/dev',
		region: 'us-east-1',
		credentials: {
			accessKeyId: process.env.ACCESS_KEY || '',
			secretAccessKey: process.env.SECRET_KEY || '',
		},
	});

	return agm;
};
