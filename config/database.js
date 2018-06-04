module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOSTNAME || 'db',
    dialect: 'postgres',
  },
};
