'use strict'
const { Model } = require('sequelize')
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Question, { foreignKey: 'UserId' })
      User.hasMany(models.Score, { foreignKey: 'UserId' })

      User.belongsToMany(models.Question, {
        through: 'UserQuestions',
        foreignKey: 'UserId',
        otherKey: 'QuestionId'
      })
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required"
          },
          notNull: {
            msg: "Username is required"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required"
          },
          notNull: {
            msg: "Email is required"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required"
          },
          notNull: {
            msg: "Password is required"
          },
          len: {
            args: 10,
            msg: "Password must be at least 10 characters"
          }
        }
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(user) {
          user.password = bcrypt.hashSync(user.password, 8)
        }
      }
    }
  )

  return User
}
