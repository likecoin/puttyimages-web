module.exports = {
  JWT_COOKIE_KEY: process.env.JWT_COOKIE_KEY || 'auth',
  JWT_EXPIRE_DAYS: process.env.JWT_EXPIRE_DAYS || 7,
  JWT_SECRET: process.env.JWT_SECRET || 'local',
  LIKECOIN_AUTH_URL: process.env.LIKECOIN_AUTH_URL || '',
  LIKECOIN_USER_STUB: {
    avatar: null,
    challenge: 'local',
    displayName: 'local',
    user: 'local',
  },
};
