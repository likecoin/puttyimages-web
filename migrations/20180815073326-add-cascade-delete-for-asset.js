module.exports = {
  up: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.sequelize.transaction(async (transaction) => {
        // add ON DELETE CASCADE for all asset related tables
        await queryInterface.sequelize.query(
          `ALTER TABLE asset_tag
           DROP CONSTRAINT asset_tag_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_tag_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint)
            ON DELETE CASCADE;`,
          { transaction }
        );

        await queryInterface.sequelize.query(
          `ALTER TABLE asset_like
           DROP CONSTRAINT asset_like_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_like_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint)
            ON DELETE CASCADE;`,
          { transaction }
        );

        await queryInterface.sequelize.query(
          `ALTER TABLE asset_stats
           DROP CONSTRAINT asset_stats_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_stats_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint)
            ON DELETE CASCADE;`,
          { transaction }
        );
      });

      resolve();
    }),
  down: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.sequelize.transaction(async (transaction) => {
        // remove ON DELETE CASCADE for all asset related tables
        await queryInterface.sequelize.query(
          `ALTER TABLE asset_tag
           DROP CONSTRAINT asset_tag_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_tag_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint);`,
          { transaction }
        );

        await queryInterface.sequelize.query(
          `ALTER TABLE asset_like
           DROP CONSTRAINT asset_like_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_like_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint);`,
          { transaction }
        );

        await queryInterface.sequelize.query(
          `ALTER TABLE asset_stats
           DROP CONSTRAINT asset_stats_asset_fingerprint_fkey,
           ADD CONSTRAINT asset_stats_asset_fingerprint_fkey
            FOREIGN KEY (asset_fingerprint)
            REFERENCES asset(fingerprint);`,
          { transaction }
        );
      });
      resolve();
    }),
};
