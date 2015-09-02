/**
* Formimag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
 

  attributes: {
    tableName : 'image',
  	faculty_name:{
  		type: 'string' 
  	},
  	faculty_add:{
  		type:'string' 
  	},
    sport_avail:{
      type:'string'
    }
}, 

  	// upload:function(data,callback){
  	// 	if(data)
  	// 	{
  	// 		return callback(null,data)
  	// 	}
  	// 	else{
  	// 		return callback('error parasing data',null)
  	// 	}
  	// },

  userinfo: function(data,callback){
    
        Data.create(data,function (err,user){
          if(err){
            callback(err);
          }
          else{
            callback(null,user);
          }
      })
    }
};

