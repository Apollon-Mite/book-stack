const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Writer extends Model {};

Writer.init({
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "writer"
});

module.exports = Writer;