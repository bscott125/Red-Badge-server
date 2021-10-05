const { DataTypes } = require("sequelize");
const db = require("../db");
const Ticket = db.define("ticket", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  slip: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  entry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
	
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Ticket;
