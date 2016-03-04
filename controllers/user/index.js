'use strict';


var UserModel = require('../../models/user');
var bcrypt = require('bcrypt');
var constant = require('../../lib/constants');
var utility = require('../../lib/utility');

module.exports = function (router) {

    var User = new UserModel();


	/*	CREATE A NEW USER
	*/
    router.post('/register', function (req, res) {
		  var firstName = req.body.firstName;
		  var lastName = req.body.lastName;
		  var email = req.body.email;
		  var password = req.body.password;
		  var environment = req.body.environment;

		  var hash = bcrypt.hashSync(password, 10);
            console.log(req.body);
		  userExist(email, environment, function(error, doc){
		  	if(error || doc == null){
		  		User.create({
					environment : environment,
					firstName : firstName,
					lastName: lastName,
					email: email,
					password: hash
				}, function(err, doc){
					if(err){
					    console.log(err);
						res.status(400).send(constant.MESSAGE_MAP.get("REGISTER_FAILED"));
					}
					else{
                        res.status(200).send(constant.MESSAGE_MAP.get("REGISTER_SUCCESS"));
                        utility.welcomeMail(email);
					}
				});
		  	}else{
		  		res.status(400).send(constant.MESSAGE_MAP.get("USER_EXIST"));
		  	}
		  });
	});


    /*	VERIFY THE USER TRYING TO LOG IN
    */
    router.post('/signin', function (req, res) {
      var userId = req.body.email;
	  var password = req.body.password;
	  var environment = req.body.environment;

      userExist(userId, environment, function(error, doc){
		if(error || doc == null){
			 res.status(401).send(constant.MESSAGE_MAP.get("USER_NOT_EXIST"));
		}else{
			 if(bcrypt.compareSync(password, doc.password) && doc.environment == environment){
				 res.json(doc);
			 }else{
				 res.status(401).send(constant.MESSAGE_MAP.get("LOGIN_FAILED"));
			 }
		}
	  });

	});

  	function userExist(email, environment, cb){
		 User.findOne({email: email, environment: environment}, function (err, doc) {
		 	 cb(err, doc);
		 });
  	}
};
