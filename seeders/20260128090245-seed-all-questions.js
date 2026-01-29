'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const dataQuest = JSON.parse(await fs.readFile("./questions.json", "utf-8"))
    dataQuest.forEach(d => {
      d.choices = JSON.stringify(d.choices)
      d.createdAt = new Date()
      d.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Questions', dataQuest, {})

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

    await queryInterface.bulkDelete('Questions', null, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
