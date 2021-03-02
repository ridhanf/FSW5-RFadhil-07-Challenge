'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_game_biodata', [
      {
        uid: 'e7516524-7b5c-11eb-9439-0242ac130002',
        firstname: 'Binar',
        lastname: 'Academy',
        city: 'Tangerang'
      },
      {
        uid: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
        firstname: 'Ridhan',
        lastname: 'Fadhilah',
        city: 'Bandung'
      },
      {
        uid: '6dcb3b28-d798-4cec-80b5-516bfe18c25b',
        firstname: 'Vincent',
        lastname: 'Kurniawan',
        city: 'Tanggerang'
      },
      {
        uid: '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
        firstname: 'Sabrina',
        lastname: 'Amalia',
        city: 'Jakarta'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_game_biodata', null, {})
  }
};
