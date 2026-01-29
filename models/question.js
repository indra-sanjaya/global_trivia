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
  }

  Question.init(
    {
      text: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      },
      choices: { 
        type: DataTypes.JSON, 
        allowNull: false 
      },
      answer: { 
        type: DataTypes.STRING, 
        allowNull: false 
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
