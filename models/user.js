'use strict';

var mongoose = require('mongoose');

var userDetails = function() {
	 var userSchema = mongoose.Schema({
	 	role : String,
	 	firstName : String,
	 	lastName: String,
	 	email : String,
        sjsuId: Number,
        isVerified: Boolean,
	 	password: String
     },{
	 	collection: 'userDetails'
	 });

	 return mongoose.model('user', userSchema);
};

module.exports = new userDetails();
