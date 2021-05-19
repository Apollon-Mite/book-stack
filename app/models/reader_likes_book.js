const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class ReaderLikesBook extends Model {};

ReaderLikesBook = sequelize.define('reader_likes_book',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
}
}, {
  sequelize,
  timestamps: false,
  tableName: "reader_likes_book"
});

module.exports = ReaderLikesBook;