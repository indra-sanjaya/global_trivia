'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Question, { foreignKey: 'CategoryId' })
      Category.hasMany(models.Score, { foreignKey: 'CategoryId' })
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Category name is required"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )

  return Category
}
