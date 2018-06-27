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

test('asset model', async () => {
  expect(models.asset.getQueryInclude).toBeInstanceOf(Function);
  expect(models.asset.getMetaById).toBeInstanceOf(Function);
  expect(models.asset.searchByKeyword).toBeInstanceOf(Function);
});
