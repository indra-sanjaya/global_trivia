'use strict';
const { Model } = require('sequelize');
const { highlightTopScore, formatScore } = require("../helpers/helper")

module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    static associate(models) {

      Score.belongsTo(models.User, { 
        foreignKey: 'UserId'
      });

      Score.belongsTo(models.Category, { 
        foreignKey: 'CategoryId'
      });
    }
    
    get formatted() {
      return formatScore(this.value);
    }

    get max() {
      return highlightTopScore(this.value, this.maxValue)
    }

  }

  Score.init(
    {
      value: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
      },
      UserId: { 
        type: DataTypes.INTEGER 
      },
      CategoryId: { 
        type: DataTypes.INTEGER 
      }
    },
    {
      sequelize,
      modelName: 'Score',
    }
  );

  return Score;
};
