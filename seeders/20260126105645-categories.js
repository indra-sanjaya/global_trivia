'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const dataCat = JSON.parse(await fs.readFile("./categories.json", "utf-8"))
    dataCat.forEach(d => {
      d.createdAt = new Date()
      d.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Categories', dataCat, {})

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
