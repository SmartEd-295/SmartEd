'use strict';

var mongoose = require('mongoose');

module.exports = function UserModel() {
	 var userSchema = mongoose.Schema({
	 	environment : String,
	 	firstName : String,
	 	lastName: String,
	 	email : String,
	 	password: String
	 },{
	 	collection: 'userDetails'
	 });

	 return mongoose.model('user', userSchema);
};
