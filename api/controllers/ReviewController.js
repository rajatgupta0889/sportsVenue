/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	createReview: function(req, res){
		if(!req.body || !req.body.userId || !req.body.groundId){
			res.badRequest("User and ground id are not present");	
		}
		else{
			// console.log(req.body.sport + req.body.groundName);
			Review.createReview(req.body, function(err, review){
				if(err)
					res.serverError(err);
				else{
					res.send(review);
					Ground.groundAvgRating(req.body,function(err,res){
						if(err){
							res.serverError(err);
						}
						else{
							console.log("Updated rating",res);
						}
					});
					console.log("Review Created");
				}		
			});
		}
	},
	listOfReviewsByUser: function(req,res){
		var userId = req.param('userId');
		Review.find({userId : userId}).exec(function(err, reviews){
  			reviews = _.map(reviews, function(review){
  				return review;
  			});
  			if(err)
  				res.serverError(err);
  			else
  				res.json(reviews);
  		});
	},
	listOfReviewsOfGround: function(req,res){
		var groundId = req.param('groundId');
		Review.find({groundId : groundId}).exec(function(err, reviews){
  			reviews = _.map(reviews, function(review){
  				return review;
  			});
  			if(err)
  				res.serverError(err);
  			else
  				res.json(reviews);
  		});
	}
};

