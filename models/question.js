'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {

      Question.belongsTo(models.Category, { 
        foreignKey: 'CategoryId'
      });

      Question.belongsTo(models.User, { 
        foreignKey: 'UserId'
      });

      Question.belongsToMany(models.User, {
        through: 'UserQuestions',
        foreignKey: 'QuestionId',
        otherKey: 'UserId'
      });
    }

    static async getQuestions(categoryId) {

      return await Question.findAll({
              where: { CategoryId: categoryId }
            })

    }

  }

  Question.init(
    {
      text: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Question text is required"
          },
          notNull: {
            msg: "Question text is required"
          }
        }
      },
      choices: { 
        type: DataTypes.JSON, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Choices is required"
          },
          notNull: {
            msg: "Choices is required"
          }
        }
      },
      answer: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Answer is required"
          },
          notNull: {
            msg: "Answer is required"
          }
        }
      },
      UserId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CategoryId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );

  return Question;
};
