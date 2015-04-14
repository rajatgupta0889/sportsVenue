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
		if(!req.body || !req.body.sport || !req.body.area){
			// res.badRequest("No data");
			res.redirect('/home');	
		}else{
			Ground.searchGroundAdvanced(req.body, function(err, grounds){
				if(err)
					res.serverError(err);
				else{
					// sails.log.debug(grounds);
					console.log("Grounds searched successfully");
					res.view('ground_search', {grounds: grounds});
					//res.send(grounds);
				}		
			});
		}
	},
	updateGround : function(req, res){
		var groundId = req.param('groundId');
		if(groundId === '' || groundId === null || groundId === undefined){
			res.badRequest('please specify the groundId to update');
		}
		else{
			req.body.groundId = groundId;
			Ground.groundUpdate(req.body, function(err,ground){
				if(err)
					res.serverError(err);
				else{
					res.send(ground);
					console.log('Ground Successfully Updated');
				}
			});
		}
	},
	listGrounds : function(req, res){
		Ground.list(function(err,grounds){
			if(err)
				res.serverError(err);
			else{
				res.send(grounds);
				// res.view('admin/adminHome', {grounds : grounds});
				console.log('Grounds Found successfully');
			}
		});
	},
	deleteGround : function(req, res){
		var groundId = req.param('groundId');
		if(!groundId){
			res.badRequest(groundId)
		}
		else{
			Ground.groundDelete(groundId, function(err,msg){
				if(err){
					res.serverError(err);
				}else{
					res.send(msg);
					// console.log('Ground deleted successfully');
				}
			});
		}
	},

	singleGround: function(req, res){
		var groundId = req.param('groundId');
		if(!groundId){
			res.badRequest(groundId);
		}else{
			// req.body.groundId = groundId;
			Ground.getSingleGround(groundId, function(err, ground){
				if(err){
					res.serverError(err);
				}else{
					// res.send(ground);
					res.view('ground_details',{ground : ground});
					console.log('Found this ground successfully');
				}
			});
		}
	}
};