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
			// req.body.userId = req.session.user.id;
			// console.log(req.body.sport + req.body.groundName);
			Ground.groundCreate(req.body, function(err, ground){
				if(err)
					res.serverError(err);
				else{
					// var successMessage = "You have successfully created this ground."; 
					res.send(ground);
					console.log("Ground Created");
				}		
			});
		}
	},
	groundSearchAdvance : function(req,res){
		if(!req.body || !req.body.sport || !req.body.area){ //|| !req.body.city
			res.badRequest("No data");
		}else{
			Ground.searchGroundAdvanced(req.body, function(err, grounds){
				if(err){
					res.serverError(err);
					// req.errorMsg = "No results found with this search. Please use advanced search or redefine your text search."
					// sails.log.debug(req);
					// res.view('index', {msg : req});
				}
				else{
					// sails.log.debug(grounds);
					console.log("Grounds searched successfully");
					// grounds.area = req.body.area;
					// grounds.sport = req.body.sport;
					if(grounds.length > 0)
						res.view('ground_search', {grounds: grounds});
					else{
						req.errorMsg = "No results found with this search. Please use advanced search or redefine your text search."
						res.view('index', {grounds : req});	
					}
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
					Review.getReviewsByGround(groundId,function(err, reviews){
						if(err)
							res.serverError(err);
						else{
							if(req.session.user && req.session.user.id){
		  						for(var i=0;i<reviews.length;i++){
		  							if(req.session.user.id === reviews[i].userId){
		  								reviews[i].ownReview = true;
		  							}
			  					}
		  					}
							//res.send(reviews);
							res.view('ground_details',{ground : ground, reviews: reviews});

						}
					});
					console.log('Found this ground successfully');
				}
			});
		}
	},

	groundSearch: function(req, res){
		if(!req.body || !req.body.searchString){
			res.redirect("/home");
		}else{
			Ground.searchGround(req.body, function(err, grounds){
				if(err){
					res.serverError(err);
				}else{
					// res.send(grounds);
					if(grounds.length > 0)
						// res.view('ground_search', {grounds: grounds});
						res.view('ground_search', {grounds: grounds});
					else{
						req.errorMsg = "No results found with this search. Please use advanced search or redefine your text search."
						res.view('index', {grounds : req});	
					}
					sails.log.debug('Found grounds using text search');
				}
			});
		}
	},

	getCreatedGrounds: function(req, res){
		var userId = req.param('userId');
		if(!userId){
			res.badRequest(userId);
		}else{
			Ground.searchGroundsByUser(userId,function(err, grounds){
				if(err){
					res.serverError(err);
				}else{
					if(grounds.length>0){
						res.send(grounds);
						sails.log.debug("Created grounds found successfully for this user!");
					}else{
						req.errorMsg = "You have not created any grounds yet."
						res.view('index', {grounds : req});	
						sails.log.debug("No grounds created by this user");
					}
				}
			});
		}
	},

	getSearchedGrounds: function(req, res){
		if(!req.body && !req.body.searchString){
			res.badRequest('No search string provided');
		}else{
			Ground.searchGround(req.body, function(err, grounds){
				if(err){
					res.serverError(err);
				}else{
					// res.send(grounds);
					if(grounds.length > 0)
						res.json({grounds: grounds});
					else{
						res.json({grounds:[]});
					}
					sails.log.debug('Found grounds using text search');
				}
			});
		}
	},

	getAdvancedSearchGrounds: function(req, res){
		if(!req.body || !req.body.sport || !req.body.area){ //|| !req.body.city
			res.badRequest("No data");
		}else{
			Ground.searchGroundAdvanced(req.body, function(err, grounds){
				if(err){
					res.serverError(err);
				}
				else{
					console.log("Grounds searched successfully");
					if(grounds.length > 0)
						res.json({grounds: grounds});
					else{
						res.json({grounds: []});
					}
				}		
			});
		}
	},

	getGround: function(req, res){
		var groundId = req.param('id');
		if(!groundId){
			res.badRequest(groundId);
		}else{
			Ground.getSingleGround(groundId, function(err, ground){
				if(err){
					res.serverError(err);
				}else{
					Review.getReviewsByGround(groundId,function(err, reviews){
						if(err)
							res.serverError(err);
						else{
							if(reviews.length>0){
								if(req.session.user && req.session.user.id){
			  						for(var i=0;i<reviews.length;i++){
			  							if(req.session.user.id === reviews[i].userId){
			  								reviews[i].ownReview = true;
			  							}
				  					}
			  					}
			  					res.json({ground : ground, reviews: reviews});
							}else{
								res.json({ground : ground, reviews: []});
							}
						}
					});
					console.log('Found this ground successfully');
				}
			});
		}
	}
};