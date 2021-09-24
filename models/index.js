const db = require('../db')
const UserModel = require('./user');
const TicketModel = require('./ticket')
const CommentModel = require('./comment');


TicketModel.belongsTo(UserModel)
CommentModel.belongsTo(UserModel)
UserModel.hasMany(TicketModel)
UserModel.hasMany(CommentModel)



module.exports = {
	dbConnection: db,
	UserModel,
	TicketModel,
	CommentModel
};