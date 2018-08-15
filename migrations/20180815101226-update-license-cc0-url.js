module.exports = {
  up: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.sequelize.query(
          `UPDATE license
            SET url = 'https://creativecommons.org/licenses/publicdomain/'
            WHERE name = 'cc0';`,
          { transaction }
        );
      });
      resolve();
    }),
  down: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.sequelize.query(
          `UPDATE license
            SET url = 'https://creativecommons.org/publicdomain/zero/1.0/'
            WHERE name = 'cc0';`,
          { transaction }
        );
      });
      resolve();
    }),
};
