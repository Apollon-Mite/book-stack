const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Feedback extends Model {};

Feedback.init({
  content: DataTypes.TEXT,
  stars: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "feedback"
});

module.exports = Feedback;