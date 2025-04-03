const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class User extends Model {}

User.init(
  {
    username: {
    //   type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
