/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var crypto     = require('crypto');
var random 	   = require("random-js")();

/**
	var habits = {smoke: true, }
	var preferences = {
						ageDiff: {lower:-2, upper: +3},
						location: {
									radius: 25KM || 
									city: [Bangalore, Mumbai, Delhi],
									weight: .6
						
						},
						education: {weight: .8},
						smoking: {weight: 0},
						height: {weight: 0.6},
	}
*/
module.exports = {


  	attributes: {
	  	username: {
		    type: 'string',
		    required : true
	    },
	    email: {
	    	type: 'email',
	    	unique: true,
	    	required:true
	    },
	    fbUserId: {
	    	type: 'string',
        defaultsTo: null
	    },
	    dob:{
	    	type: 'date',
	    },
	    gender:{
	    	type: 'string',
	    	in: ['male', 'female']
	    },
	    city: {
	    	type: 'string',
	    	in: ['Bangalore', 'Mumbai', 'Pune', 'NCR', 'Chennai']
	    },
	    password: {
	    	type: 'string',
	    	// required:true
	    },
      contactNumber: {
        type: 'integer'
      },
      permission: {
        type: 'string',
        defaultsTo: 'normal',
        in: ['super', 'normal']
      }
  	},

  	list: function(cb){
  		User.find().exec(function(err, users){
  			users = _.map(users, function(user){
  				delete user['password'];
  				return user;
  			});

  			if(err)
  				cb(err);
  			else
  				cb(null, users);
  		});
  	},

  	login : function(opts, cb){
  		User.findOne({where:{email:opts.email}}).exec(function(err, user){
	  		if(err)
	  			cb(err);
	  		else if(user){
	  				validatePassword(opts.password,user.password,function(res){
	  					if(res){
	  						delete user['password'];
	  						cb(null,user);
	  					}
	  					else{
	  						cb("Email or password does not match");
	  					}
	  				});
	  			}
	  			else{
	  				cb("user does not exist");
	  			}	
	  	});
  	},

  	updateProfile: function(opts, cb){
  		User.findOne({id: opts.fbUserId}).exec(function(err, user){
  			if(!err && user){
  				user = _.merge(user, opts);
  				User.update({fbUserId: opts.fbUserId}, user).exec(function(err, updatedUsers){
  					if(!err && updatedUsers.length > 0)
  						cb(null, updatedUsers[0]);
  					else
  						cb(err);
  				});
  			}else if(!err & !user)
  				cb(Error('User Not Found'));
  			else
  				cb(err);
  		});
  	},
  	signUp : function(opts,cb){
  		User.findOne({where:{email:opts.email}}).exec(function(err, user){
	  		if(err)
	  			cb(err);
	  		else if(!user){
	  			saltAndHash(opts.password,function(hash){
	  				opts.password = hash;
            var userPassword = opts.userPwd;
	  				User.create(opts, function(err, user){
					   if(err)
						  cb(err);
	  				 else{
	  					delete user['password'];
              delete user['userPwd'];
	  					cb(null, user);
	  				 }
	  			  });
	  			});
	  		}
	      else{
	        cb("User Already exists", null);
	      }		
	  	});
  	},

    userDelete : function(opts,cb){
      User.findOne({ id : opts}).exec(function(err,user){
        if(err){
          console.log(err);
          cb(err);
        }else if(user){
          User.destroy({id: opts}).exec(function(err){
            if(err){
              console.log(err);
              cb(err);
            }else{
              cb(null,'User removed successfully')
            }
          });
        }else{
          console.log('Unable to remove this user');
          cb(null,'Unable to remove this user');
        }
      });
    },

    userUpdate: function(opts, cb){
      User.findOne({ id : opts.userId }).exec(function(err,user){
        if(err){
          console.log(err);
          cb(err);
        }else if(user){
          var newName = opts.username || user.username;
          var newEmail = opts.email || user.email;
          var newFBUserId = opts.fbUserId || user.fbUserId;
          var newDOB = opts.dob || user.dob;
          var newGender = opts.gender || user.gender;
          var newCity = opts.city || user.city;
          // var newAcctStatus = opts.accountStatus || user.accountStatus;
          var newContactNumber = opts.contactNumber || user.contactNumber;
          var oldPassword = user.password;

          User.update({
            id: opts.userId
          },
          {
            username : newName,
            email : newEmail,
            fbUserId : newFBUserId,
            dob : newDOB,
            gender : newGender,
            city : newCity,
            permission: user.permission,
            // accountStatus : newAcctStatus,
            contactNumber : newContactNumber,
            password : oldPassword
          }).exec(function(err,user){
            if(err){
              console.log(err);
              cb(err);
            }
            else{
              cb(null,user);
            }
          });
        }else{
          cb('User Update not possible');
        }
      });
    },

    getSingleUser: function(opts, cb){
      User.find({id : opts.userId}).exec(function(err,user){
        if(err){
          console.log(err);
          cb(err,null);
        }else{
          cb(null,user);
        }
      });
    },

    setNewPassword: function(opts, cb){
      User.findOne({where:{email:opts.email}}).exec(function(err, user){
        if(err)
          cb(err, null);
        else if(user){
          saltAndHash(opts.password,function(hash){
            opts.password = hash;
            User.update(
            {
              email:opts.email
            },
            {
              username : user.username,
              email : user.email,
              fbUserId : user.fbUserId,
              dob : user.dob,
              gender : user.gender,
              city : user.city,
              permission : user.permission,
              // accountStatus : newAcctStatus,
              contactNumber : user.contactNumber,
              password : opts.password
            }).exec(function(err,user){
              if(err){
                console.log(err);
                cb(err);
              }
              else{
                if(user.userPwd)
                  delete user['userPwd'];
                cb(null,user);
              }
            });
          });
        }
        else{
          cb(null, 'Email id not found');
        }
      });
    }

  	// addImage: function(opts, cb){
  	// 	sails.log.debug(opts);
  	// 	var image = opts.data;
  	// 	var ext = image.substring(image.indexOf('/')+1, image.indexOf(";"));

   //      image = image.replace(/^data:image\/png;base64,/, "");
   //      image = image.replace(/^data:image\/jpg;base64,/, "");
   //      image = image.replace(/^data:image\/jpeg;base64,/, "");

   //      image = new Buffer(image, 'base64');
        
   //      var doc = {};
   //      doc.name = opts.fbUserId + '-' + (random.integer(1, 100000)) + '.jpeg';
   //      doc.data = image;

   //      User.findOne({fbUserId: opts.fbUserId}).exec(function(err, user){
   //      	if(!err){
   //      		if(user.images)
   //      			user.images.push(doc.name);
   //      		else
   //      			user.images = [doc.name];
        		
   //      		User.update({fbUserId: opts.fbUserId}, user).exec(function(err, updatedUser){
   //      			if(!err)
   //      				cb(null, updatedUser);
   //      			else
   //      				cb(err);
   //      		});
   //      	}

   //      })

   //      AWSService.upload(doc, function(err, res){
   //      });
  	// },

  	// addCoffeeInvite: function(opts, cb){
  		
  	// }

  	
};

var generateSalt = function(){
  	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  	var salt = '';
  	for (var i = 0; i < 10; i++) {
    	var p = Math.floor(Math.random() * set.length);
    	salt += set[p];
  	}
  	return salt;
}

var md5 = function(str) {
  	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
  	var salt = generateSalt();
  	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
  	var salt = hashedPass.substr(0, 10);
  	var validHash = salt + md5(plainPass + salt);
  	callback(hashedPass === validHash);
}