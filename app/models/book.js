const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Book extends Model {};

Book.init({
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  picture_url: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "book"
});

module.exports = Book;

