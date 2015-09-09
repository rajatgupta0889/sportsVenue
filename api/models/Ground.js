/**
* Ground.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var arr2 = [];
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
	    },
	    imageURL: {
	    	type: 'string'
	    },
	    faculty_name:{
	  		type: 'string' 
	  	},
	  	faculty_add:{
	  		type:'string' 
	  	},
	  	own_first_name:{
	  		type:'string' 
	  	},
	  	own_middle_name:{
	  		type:'string'
	  	},
	  	own_last_name:{
	  		type:'string'
	  	},
	  	own_email:{
	  		type:'string' 
	  	},
	  	on_book_faci:{
	  		type:'string'
	  	},
	  	coll_mantra:{
	  		type:'string'
	  	},
	  	avatar:{
	  		type:'string'
	  	},
	  	reg_membr_email:{
	  		type:'string'
	  	},
	  	reg_membr_cont:{
	  		type:'string'
	  	},
	  	sport_avail:{
	  		type:'string' 
	  	},
	  	coach_sport:{
	  		type:'string'
	  	},
	  	coach_charg:{
	  		type:'string'
	  	},
	  	instruc_email:{
	  		type:'string'
	  	},
	  	req_equp:{
	  		type:'string'
	  	},
	  	equp_charg:{
	  		type:'string'
	  	},
	  	spec_time:{
	  		type:'string'
	  	},
	  	specific_time:{
	  		type:'string'
	  	},
	  	found_date:{
	  		type:'string'
	  	},
	  	open_timing:{
	  		type:'string'
	  	},
	  	close_timing:{
	  		type:'string'
	  	},
	  	oth_branch:{
	  		type:'string'
	  	},
	  	branch_detail:{
	  		type:'string'
	  	},
	  	multi_field:{
	  		type:'string'
	  	},
	  	multi_field_name:{
	  		type:'string'
	  	},
	  	if_multi_field:{
	  		type:'string'
	  	},
	  	no_coach:{
	  		type:'string'
	  	},
	  	coach_name:{
	  		type:'string'
	  	},
	  	coach_age:{
	  		type:'string'
	  	},
	  	coach_exp:{
	  		type:'string'
	  	},
	  	fee_col_1:{
	  		type:'string'
	  	},
	  	fee_col_2:{
	  		type:'string'
		},
		fee_col_3:{
			type:'string'
		},
		oth_requir:{
			type:'string'
		},
		summ:{
			type:'string'
		},
		branch_own_first_name:{
			type:'string'
		},
		branch_own_middle_name:{
			type:'string'
		},
		branch_own_last_name:{
			type:'string'
		},
		ground_book:{
			type:'string'
		},
		fee_ground:{
			type:'string'
		},
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
		Ground.findOne({ id: opts.groundId }).exec(function(err,ground){
			if(err){
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
		if(opts.searchString.indexOf(' ')>0){
			var arrSearch = opts.searchString.split(" ");
    		var searchRegEx = new RegExp(arrSearch.join("|"),"gi"); 

    		Ground.find(
			{$and : [
					{area : searchRegEx},
					{sport : searchRegEx},
					{city: opts.searchCity}
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
		}else{
			var searchRegEx = opts.searchString;
			Ground.find({sport: {'contains':searchRegEx},city: opts.searchCity}).exec(function(err, grounds){
				if(err){
					cb(err, null);
				}else{
					cb(null, grounds);
				}
			});
		}
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
	},

	findSports: function(callback){
		var that = this;
		Ground.native(function(err, coll){
			coll.distinct('sport', function(err, sport){
				if(err){
					callback(err, null);
				}else{
					for(var i=0;i<sport.length;i++){
						if(sport[i].indexOf(' ') != -1){
							that.splitArray(sport[i]);
						}else{
							arr2.push(sport[i]); 
						}
					}
					callback(null, arr2);
				}
			});
		});
	},

	splitArray: function(str){
		var s = str.split(' ');
		for(var i=0;i<s.length;i++){
			//     console.log(s[i]);
			if(_.contains(arr2,s[i])){
			  	console.log('already has'+s[i]);
			}else{
			   	arr2.push(s[i]); 
			}
		}
	},

	findCities: function(callback){
		Ground.native(function(err, coll){
			coll.distinct('city', function(err, city){
				if(err){
					callback(err, null);
				}else{
					for(var i=0;i<city.length;i++){
						if(city[i]== null){
							city.pop();
						}
					}
					callback(null, city);
				}
			});
		});
	},

	findAreas: function(callback){
		Ground.native(function(err, coll){
			coll.distinct('area', function(err, area){
				if(err){
					callback(err, null);
				}else{
					callback(null, area);
				}
			});		
		});
	}
};

