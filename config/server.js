module.exports = {
  JWT_COOKIE_KEY: process.env.JWT_COOKIE_KEY || 'auth',
  JWT_COOKIE_MAX_AGE: process.env.JWT_EXPIRE_DAYS || 7 * 24 * 60 * 60 * 1000,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || '7d',
  JWT_SECRET: process.env.JWT_SECRET || 'local',
  LIKECHAIN_HOST: process.env.LIKECHAIN_HOST || '',
  LIKECHAIN_STORAGE_PROVIDER:
    process.env.LIKECHAIN_STORAGE_PROVIDER || 'puttyimages',
  LIKECOIN_AUTH_URL: process.env.LIKECOIN_AUTH_URL || '',
  LIKECOIN_USER_STUB: {
    avatar: null,
    challenge: 'local',
    displayName: 'local',
    user: 'local',
  },
  PROVIDER_ADDRESS: process.env.PROVIDER_ADDRESS || '',
  PROVIDER_PRIVATE_KEY: process.env.PROVIDER_PRIVATE_KEY || '',
};
