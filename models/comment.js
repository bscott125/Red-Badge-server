const { DataTypes } = require('sequelize');
const db = require('../db');
    
const Comment = db.define('comment', {
 title: {
type: DataTypes.STRING,
 allowNull: false
 },

 date: {
 type: DataTypes.STRING,
 allowNull: false
 },

 entry: {
type: DataTypes.STRING,
 allowNull: false
}


});

module.exports = Comment;