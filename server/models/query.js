import sequelize from '../models';

export const query = {
  bulkCreateTags(tags) {
    // NOTE: sequelize.model.bulkCreate fail on duplicate in postgres
    return sequelize.sequelize.query(`INSERT INTO tag (name) VALUES
            ${tags.map(tag => `('${tag}')`).join(', ')}
            ON CONFLICT DO NOTHING;`);
  },
};

export default query;
