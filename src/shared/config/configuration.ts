export default () => ({
  isTest: process.env.NODE_ENV === 'test',
  isProduction: process.env.NODE_ENV === 'production',
  isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    databaseName: process.env.POSTGRES_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
});
