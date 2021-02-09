require('dotenv').config()
const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
{
  dialect: 'postgres',
  dialectOptions: {useUTC: false, dateStrings: true, typeCast: true},
  timezone: '+07:00'
})

module.exports = sequelize

const checkConnection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}