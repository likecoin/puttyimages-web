module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'local',
  LIKECOIN_AUTH_URL: process.env.LIKECOIN_AUTH_URL || '',
  LIKECOIN_USER_STUB: {
    avatar: null,
    challenge: 'local',
    displayName: 'local',
    user: 'local',
  },
};
