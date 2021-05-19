const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Reader extends Model {};

Reader.init({
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "reader"
});

module.exports = Reader;