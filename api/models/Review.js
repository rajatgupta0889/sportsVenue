/**
* Review.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  	userId: {
	  		type: 'string',
			required : true
	  	},
		groundId: {
	  		type: 'string',
		    required:true
	  	},
	  	title: {
	  		type: 'string'
	  	},
		review: {
	  		type: 'string'
	  	},
		rating: {
		 	type: 'float'
		},
		userName: {
			type: 'string'
		}
  	},

  	list: function(cb){
  		Review.find().exec(function(err, reviews){
  			reviews = _.map(reviews, function(review){
  				return review;
  			});
  			if(err)
  				cb(err);
  			else
  				cb(null, reviews);
  		});
  	},
  	reviewCreate : function(opts, cb){
  		Review.findOne({userId : opts.userId,groundId : opts.groundId}).exec(function(err, review){
	  		if(err){
	  			cb(err);
	  		}
	  		else if(!review){
	  			Review.create(opts, function(err, review){
					if(err){
						cb(err);
					}
	  				else{
	  					cb(null, review);
	  				}
	  			});
	  		}
	        else{
	      		cb("You already provide the review & ratings ");
	      	}		
	  	});
  	},

  	getReviewsByUser: function(userId, cb){
  		Review.find({userId : userId}).exec(function(err, reviews){
  			reviews = _.map(reviews, function(review){
  				return review;
  			});
  			if(err)
  				res.serverError(err);
  			else
  				cb(null,reviews);
  		});
  	},

  	getReviewsByGround: function(groundId, cb){
  		Review.find({groundId : groundId}).exec(function(err, reviews){
  			reviews = _.map(reviews, function(review){
  				return review;
  			});
  			if(err)
  				res.serverError(err);
  			else
  				cb(null,reviews);
  		});
  	},

  	reviewDelete: function(reviewId, cb){
  		Review.findOne({ id : reviewId}).exec(function(err,review){
			if(err){
				console.log(err);
				cb(err, null);
			}else if(review){
				Review.destroy({id: reviewId}).exec(function(err){
					if(err){
						cb(err,null);
					}else{
						cb(null,'Review deleted successfully')
					}
			});
			}else{
				console.log('Unable to delete this review');
			}
		});
  	}
};

