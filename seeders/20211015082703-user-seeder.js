'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Omanof Sullivan',
        profession: 'Admin Micro',
        role: 'admin',
        email: 'oman@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        created_at: new Date(),
      },
      {
        name: 'Seo Dal Mi',
        profession: 'Front End Developer',
        role: 'student',
        email: 'dalmi@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
