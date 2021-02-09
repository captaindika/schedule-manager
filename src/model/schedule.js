const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/connection')

class Schedule extends Model {}

Schedule.init({
  idSechedule: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id',
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'desc'
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'is_done'
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    field: 'user_id'
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
  modelName: 'schedules'
});

module.exports = Schedule