const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Feedback extends Model {};

Feedback.init({
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "Feedback"
});

module.exports = Feedback;