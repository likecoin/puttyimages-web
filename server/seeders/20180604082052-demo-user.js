module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('user', [
      {
        likecoin_id: 'likecoin_id_1',
        display_name: 'Alexandre',
        wallet: 'address 1',
      },
      {
        likecoin_id: 'likecoin_id_2',
        display_name: 'Pooya',
        wallet: 'address 2',
      },
      {
        likecoin_id: 'likecoin_id_3',
        display_name: 'Sébastien',
        wallet: 'address 3',
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
