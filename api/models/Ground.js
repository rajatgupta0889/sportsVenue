/**
* Ground.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


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
		    type: 'string'
		},
		location: {
		   	type: 'json',
		   	point: true
		},
		availability: {
		    type: 'string'
		},
		area: {
			type: 'string'
		},
		ratingCount: {
			type: 'integer',
			defaultsTo: 0
		},
		phoneNum: {
			type: 'integer',
			defaultsTo : null
		},
    userId: {
      type: 'string'
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
		Ground.findOne({groundName: opts.groundName, sport: opts.sports, area: opts.area}).exec(function(err, ground){
  		if(err){
  			cb(err);
  		}
  		else if(!ground){
        var xLat = opts.x;
        var yLong = opts.y;
        opts.location = { x : xLat, y: yLong };
        delete opts.x;
        delete opts.y;
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
		var sportToSearch = new RegExp(opts.sport,"i");
		// var cityToSearch = new RegExp(opts.city,"i");
    Ground.find({area : opts.area, sport : sportToSearch}) //city : cityToSearch, 
    .exec(function(err, grounds){
			grounds = _.map(grounds, function(ground){
				return ground;
			});
			if(err)
				cb(err);
			else{
				cb(null, grounds);
			}
		});
	},
	groundAvgRating : function(opts,cb){
		Ground.findOne({ id: opts.groundId}).exec(function(err, ground){
  		if(err){
  			console.log(err)
  			cb(err);
  		}
  		else if(ground){
  			var currentRating = ground.rating;
  			var ratingCount = ground.ratingCount;
  			var newRating = (parseInt(currentRating) * parseInt(ratingCount) + parseInt(opts.rating))/(ratingCount + 1);
  			Ground.update({ id: opts.groundId},{rating : newRating, ratingCount : ratingCount+1}).exec(function(err,ground){
  				if(err){
		  			console.log(err);
		  			cb(err);
		  		}
		  		else{
		  			cb(null,ground);
		  		}
  			});

  			// cb(null,newRating);
  		}
      else{
        cb("Ground detail is not available");
      }		
  	});
	},
	groundUpdate:function(opts,cb){
		console.log(opts);
		Ground.findOne({ id: opts.groundId }).exec(function(err,ground){
			if(err){
				console.log(err);
				cb(err);
			}else if(ground){
				var newSports = opts.sport || ground.sport;
				var newGroundInfo = opts.groundInfo || ground.groundInfo;
				var newGroundName = opts.groundName || ground.groundName;
				var newGroundAddress = opts.address || ground.address;
				var newCity = opts.city || ground.city;
				var newArea = opts.area || ground.area;
				var newLocationX = opts.x || ground.location.x;
				var newLocationY = opts.y || ground.location.y;
				var newNum = opts.phoneNum || ground.phoneNum;
				var newArea = opts.area || ground.area;
				var newAvailability = opts.availability || ground.availability;
				// var newRating = opts.rating || ground.rating;
				// var newRatingCount = opts.ratingCount || ground.ratingCount;
				Ground.update({
					id: opts.groundId
				},{
					sport : newSports,
					groundInfo : newGroundInfo,
					groundName : newGroundName,
					address : newGroundAddress,
					city : newCity,
					area : newArea,
					location : { x: newLocationX, y: newLocationY },
					phoneNum : newNum,
					area : newArea,
					availability : newAvailability
					// ratingCount	: newRatingCount
					// rating : newRating
				}).exec(function(err,ground){
					if(err){
		  				cb(err);
		  			}
			  		else{
			  			cb(null,ground);
			  		}
				});
			}else{
				cb('Ground Update not possible');
			}
		});
	},

	groundDelete : function(opts,cb){
		Ground.findOne({ id : opts}).exec(function(err,ground){
			if(err){
				console.log(err);
				cb(err);
			}else if(ground){
			Ground.destroy({id: opts}).exec(function(err){
				if(err){
					console.log(err);
					cb(err);
				}else{
					cb(null,'Ground deleted successfully')
				}
		});
			}else{
				console.log('Unable to delete this ground');
			}
		});
	},

	getSingleGround: function(groundId, cb){
		Ground.find({ id : groundId }).exec(function(err, ground){
			if(err){
				console.log(err);
				cb(err,null);
			}else{
				cb(null,ground);
			}
		})
	},

	searchGround: function(opts, cb){
		var arrSearch = opts.searchString.split(" ");
    var searchRegEx = new RegExp(arrSearch.join("|"),"gi"); 

		Ground.find(
			{$and : [
				{area : searchRegEx},
				{sport : searchRegEx}
				]}
		).exec(function(err, grounds){
			grounds = _.map(grounds, function(ground){
				return ground;
			});
			if(err)
				cb(err);
			else{
				cb(null, grounds);
			}
		});
	},

  searchGroundsByUser: function(userId, cb){
    Ground.find({id: userId}).exec(function(err, grounds){
      grounds = _.map(grounds, function(ground){
        return ground;
      });
      if(err)
        cb(err,null);
      else
        cb(null, grounds);
    });
  }
};

