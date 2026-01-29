'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserQuestion extends Model {
    static associate(models) {
      UserQuestion.belongsTo(models.User, { foreignKey: 'UserId' });
      UserQuestion.belongsTo(models.Question, { foreignKey: 'QuestionId' });
    }
  }

  UserQuestion.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    QuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserQuestion',
    tableName: 'UserQuestions'
  });

  return UserQuestion;
};
