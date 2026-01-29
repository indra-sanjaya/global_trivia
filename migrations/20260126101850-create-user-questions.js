'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserQuestions', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      QuestionId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Questions', 
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      answer: { 
        type: Sequelize.STRING 
      },
      isCorrect: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
      },
      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserQuestions');
  }
};