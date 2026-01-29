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
          },
          notNull: {
            msg: "Category name is required"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required"
          },
          notNull: {
            msg: "Description is required"
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )

  return Category
}
