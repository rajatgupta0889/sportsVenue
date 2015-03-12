/**
 * GroundController
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
	// _config: {},

	createGround: function(req, res){
		if(!req.body || !req.body.sport || !req.body.groundName){
			res.badRequest(req.body.sport + req.body.groundName);	
		}
		else{
			// console.log(req.body.sport + req.body.groundName);
			Ground.groundCreate(req.body, function(err, ground){
				if(err)
					res.serverError(err);
				else{
					res.send(ground);
					console.log("Ground Created");
				}		
			});
		}
	},
	groundSearchAdvance : function(req,res){
		if(!req.body|| !req.body.sport || !req.body.area){
			res.badRequest("No data");	
		}
		else{
			Ground.searchGroundAdvanced(req.body, function(err, grounds){
				if(err)
					res.serverError(err);
				else{
					res.send(grounds);
					console.log("Ground search");
				}		
			});
		}
	}
};

