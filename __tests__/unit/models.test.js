const sequelize = require('sequelize');

const models = require('../../server/models');

test('get sequelize instance', async () => {
  expect(models.sequelize).toBeInstanceOf(sequelize);
  expect(models.Sequelize).toBeInstanceOf(Function);
  const User = models.user;
  expect(new User()).toBeInstanceOf(sequelize.Model);
  if (User.associate) {
    expect(User.associate).toBeInstanceOf(Function);
  }
});
