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
		review: {
	  		type: 'string'
	  	},
		rating: {
		 	type: 'float'
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
  	createReview : function(opts, cb){
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
  	}
};

