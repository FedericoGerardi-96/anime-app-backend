
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3002,
    mongodb: process.env.MONGO_URL,
    jwtSeed: process.env.JWT_SEED || 'secret',
})