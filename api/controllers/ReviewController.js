/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	createReview: function(req, res){
		req.body.userName = req.session.user.username;
		req.body.userId = req.session.user.id;
		if(!req.body || !req.body.groundId){
			res.badRequest("User and ground id are not present");	
		}
		else{
			// console.log(req.body.sport + req.body.groundName);
			Review.reviewCreate(req.body, function(err, review){
				if(err)
					res.serverError(err);
				else{
					Ground.groundAvgRating(req.body,function(err,updatedData){
						if(err){
							res.serverError(err);
						}
						else{
							console.log("Updated rating",updatedData);
							res.send("true");
						}
					});
					console.log("Review Created");
				}		
			});
		}
	},

	listReviews: function(req, res){
		Review.list(function(err,reviews){
			if(err)
				res.serverError(err);
			else{
				res.send(reviews);
				// res.view('admin/adminHome', {grounds : grounds});
				console.log('reviews Found successfully');
			}
		});
	},

	listOfReviewsByUser: function(req,res){
		var userId = req.param('userId');

  		Review.getReviewsByUser(userId, function(err,reviews){
  			if(err){
  				res.serverError(err);
  			}else{
  				res.send(reviews);
  				sails.log.debug("Got all reviews for this user");
  			}
  		});
	},

	listOfReviewsOfGround: function(req,res){
		var groundId = req.param('groundId');

  		Review.getReviewsByGround(groundId,function(err, reviews){
  			if(err){
  				res.serverError(err);
  			}else{
  				// if(reviews.length > 0){
  					if(req.session.user && req.session.user.id){
  						for(var i=0;i<reviews.length;i++){
  							if(req.session.user.id === reviews[i].userId){
  								reviews[i].ownReview = true;
  							}
	  					}
  					}
   					res.send(reviews);
  					sails.log.debug("got all reviews for this ground");
  				// }else{
  				// 	res.send("No reviews found for this ground!");
  				// 	sails.log.debug("no reviews present for this ground");
  				// }
  			}
  		});
	},

	deleteReview: function(req, res){
		var reviewId = req.param('reviewId');

		Review.reviewDelete(reviewId, function(err, message){
			if(err){
				res.serverError(err);
			}else{
				res.send(message);
			}
		});
	}
};