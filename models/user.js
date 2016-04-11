'use strict';

var mongoose = require('mongoose');

module.exports = function UserModel() {
	 var userSchema = mongoose.Schema({
	 	role : String,
	 	firstName : String,
	 	lastName: String,
	 	email : String,
        studentId: Number,
        isVerified: Boolean,
	 	password: String
	 },{
	 	collection: 'userDetails'
	 });

	 return mongoose.model('user', userSchema);
};
