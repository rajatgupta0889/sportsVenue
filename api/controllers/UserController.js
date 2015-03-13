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
		if(!req.body || !req.body.email || !req.body.password)
			res.badRequest('Email or password missing in request');
		else{
			User.login(req.body, function(err, user){
				if(err)
					res.serverError(err);
		      	else{
		      		console.log(user)
		        	req.session.authenticated = true;
		          	req.session.user = user;
		          	res.json(user);
		          	//ElasticService.search();
		        }		
			});
		}
	},

	list: function(req, res){
		User.list(function(err, users){
			if(err)
				res.serverError(err);
			else
				res.json(users);
		});
	},

	signUp : function(req, res){
		if(!req.body || !req.body.email || !req.body.password)
			res.badRequest('Email or password missing in request');
		else{
			User.signUp(req.body, function(err, user){
				if(err)
					res.serverError(err);
		      	else{
		        	// req.session.authenticated = true;
		           	// req.session.user = user;
		          	res.json(user);
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
	}
  
};