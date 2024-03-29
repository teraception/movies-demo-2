export const appConfig = {
    aws: {
        region: process.env.NEXT_PUBLIC_AWS_REGION as string,
        accessKey: process.env.AWS_ACCESS_KEY_ID as string,
        secret: process.env.AWS_SECRET_ACCESS_KEY as string,
        bucket: process.env.AWS_BUCKET_NAME as string,
    },
    cognitoAuth: {
        region: process.env.NEXT_PUBLIC_AWS_REGION as string,
        userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        mandatorySignIn: true,
    },
    database: {
        url: process.env.DATABASE_URL as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as string,
        name: process.env.DB_NAME as string,
    },
    nextAuthSecretKey: process.env.AUTH_SECRET as string,
    projectRoot: process.env.PROJECT_ROOT as string,
};

export default appConfig;
