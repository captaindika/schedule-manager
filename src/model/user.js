const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/connection')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }

}, {
  sequelize,
  modelName: 'User'
});

module.exports = User