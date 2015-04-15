/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
	_config: {},

	login : function(req, res){
		var that = this;
		if(!req.body || !req.body.email || !req.body.password)
			res.badRequest('Email or password missing in request');
		else{
			User.login(req.body, function(err, user){
				if(err){
					// res.serverError(err);
					req.body.errorMessage = "The email or password you entered is incorrect."
					that.postSignUp(req, res);
				}
		      	else{
		        	req.session.authenticated = true;
		          	req.session.user = user;
		          	// res.json(user);
		          	// res.view('index',{user : req.session.user});
		          	res.redirect('/home');
		          	//ElasticService.search();
		        }		
			});
		}
	},

	list: function(req, res){
		User.list(function(err, users){
			if(err)
				res.serverError(err);
			else{
				res.json(users);
				sails.log.debug('users found successfully');
			}
		});
	},

	signUp : function(req, res){
		var that= this;
		if(!req.body || !req.body.email || !req.body.username)
			res.badRequest('Email or username missing in request');
		else{
			req.body.password = that.generatePassword();
			req.body.userPwd = req.body.password;
			User.signUp(req.body, function(err, user){
				if(err)
					res.serverError(err);
		      	else{
		        	// req.session.authenticated = true;
		           	// req.session.user = user;
		           	sails.log.debug('signed up successfully!');
		          	that.sendSignUpEmailToUser(req.body,res);
		        }		
			});
		}
	},

	resetPassword: function(req, res){
		var that= this;
		if(!req.body || !req.body.email){
			res.badRequest('Please enter an email address');
		}else{
			req.body.password = that.generatePassword();
			req.body.userPwd = req.body.password;
			User.setNewPassword(req.body, function(err, user){
				if(err){
					res.serverError(err);
				}else{
					sails.log.debug('Password reset successfully');
					that.sendPasswordResetEmailToUser(req.body,res);
				}
			});
		}
	},

	isLoggedIn : function(req,res){
		sails.log.debug(req.session);
	    if(req.session && req.session.authenticated && req.session.user){
	        res.json(req.session.user);
	    } else{
	        res.json(false);
	    }
	},

	sendSignUpEmailToUser: function(req,res){
		var that = this;
		mailService.sendSignUpMail(req,function(err, response){
			if(err)
				sails.log.debug(err);
			else{
				sails.log.debug('mail sent successfully'+response);
				// res.redirect('/postsignup');
				req.successMessage = "Thank you for registering. We have sent you a mail containing your account information. Please sign in using that information. We are waiting for you.";
				that.postSignUp(req, res);
			}
		});
	},

	sendPasswordResetEmailToUser: function(req, res){
		var that = this;
		mailService.sendResetMail(req,function(err, response){
			if(err)
				sails.log.debug(err);
			else{
				sails.log.debug('mail sent successfully'+response);
				// res.redirect('/postsignup');
				req.successMessage = "It was our pleasure helping you. We have sent a new password to your email. Please use it to login.";
				that.postSignUp(req, res);
			}
		});
	},

	deleteUser: function(req, res){
		var userId = req.param('userId');
		if(!userId){
			req.badRequest('no userId specified to delete. Please specify one');
		}else{
			User.userDelete(userId, function(err,message){
				if(err)
					res.serverError(err);
				else
					res.send(message);
			});
		}
	},

	updateUser : function(req, res){
		var userId = req.param('userId');
		if(userId === '' || userId === null || userId === undefined){
			res.badRequest('please specify a userid to update');
		}else{
			req.body.userId = userId;
			User.userUpdate(req.body,function(err,user){
				if(err)
					res.serverError(err);
				else{
					res.send(user);
					sails.log.debug('User updated successfully');
				}
			});
		}
	},

	singleUser: function(req, res){
		var userId = req.param('userId');
		if(userId === '' || userId === null || userId === undefined){
			res.badRequest('please specify a userid to update');
		}else{
			req.body.userId = userId;
			User.getSingleUser(req.body, function(err, user){
				if(err)
					res.serverError(err);
				else{
					res.send(user);
					sails.log.debug('Found this user successfully');
				}
			});
		}
	},

	generatePassword: function(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	},

	userLogout: function(req, res){
		if(!req.session.user){
			res.badRequest('No logged in user found');
		}else{
			req.session.authenticated = false;
		    // req.session = null;
		    req.session.destroy();
		    res.clearCookie('SV', { path: '/' });
		    res.redirect('/home');
		}
	},

	showHomePage: function(req, res){		
		res.view('index', {grounds : null});
	},

	postSignUp: function(req, res){
		res.view('post_signup',{msg : req});
	}
};