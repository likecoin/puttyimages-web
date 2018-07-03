module.exports = {
  development: {
    database: process.env.DB_NAME || 'postgres',
    dialect: 'postgres',
    host: process.env.DB_HOSTNAME || 'db',
    password: process.env.DB_PASSWORD || null,
    username: process.env.DB_USERNAME || 'postgres',
  },
};
