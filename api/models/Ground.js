/**
* Ground.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto     = require('crypto');
var random 	   = require("random-js")();

module.exports = {
  types: {
	    point: function(latlng){
	    	sails.log.debug("latlng.x : "+latlng.x);
	    	sails.log.debug("latlng.y : "+latlng.y);
	     return latlng.x && latlng.y
	    }
	},
  attributes: {
	  	sport: {
	  		type:'string',
			required : true
	  	},
	  	groundName: {
	  		type:'string',
		    required:true
	  	},
	  	groundInfo: {
	  		type:'string'
	  	},
	  	address: {
	  		type:'text'
	  	},
	  	rating: {
	  		type:'float',
	  		defaultsTo : 0
	  	},
		city: {
		    type: 'string',
		   	in: ['Bangalore', 'Mumbai', 'Pune', 'NCR', 'Chennai']
		},
		location: {
		   	type: 'json',
		   	point: true
		},
		availability: {
		    	type: 'boolean'
		},
		area : {
			type: 'string'
		},
		ratingCount : {
			type: 'integer',
			defaultsTo: 0
		}

  },
  list: function(cb){
  		Ground.find().exec(function(err, grounds){
  			grounds = _.map(grounds, function(ground){
  				return ground;
  			});
  			if(err)
  				cb(err);
  			else
  				cb(null, grounds);
  		});
  	},
  	groundCreate : function(opts, cb){
  		Ground.findOne({groundName: opts.groundName}).exec(function(err, ground){
	  		if(err){
	  			cb(err);
	  		}
	  		else if(!ground){
	  			Ground.create(opts, function(err, ground){
					if(err){
						cb(err);
					}
	  				else{
	  					cb(null, ground);
	  				}
	  			});
	  		}
	      else{
	        cb(null, ground);
	      }		
	  	});
  	},
  	searchGroundAdvanced : function(opts,cb){
		Ground.find({area : opts.area, sport : opts.sport }).exec(function(err, grounds){
	  			grounds = _.map(grounds, function(ground){
	  				return ground;
	  			});
	  			if(err)
	  				cb(err);
	  			else
	  				cb(null, grounds);
	  		});
  	},
  	groundAvgRating : function(opts,cb){
  		console.log(opts);
  		Ground.findOne({ id: opts.groundId}).exec(function(err, ground){
	  		if(err){
	  			console.log(err)
	  			cb(err);
	  		}
	  		else if(ground){
	  			var currentRating = ground.rating;
	  			var ratingCount = ground.ratingCount;
	  			var newRating = (currentRating * ratingCount + opts.rating)/(ratingCount + 1);

	  			Ground.update({ id: opts.groundId},{rating : newRating, ratingCount : ratingCount+1}).exec(function(err,ground){
	  				if(err){
			  			console.log(err);
			  			cb(err);
			  		}
			  		else{
			  			cb(null,ground);
			  		}
	  			});

	  			cb(null,newRating)
	  		}
	      else{
	        cb("Ground detail is not available");
	      }		
	  	});
  	}

};

