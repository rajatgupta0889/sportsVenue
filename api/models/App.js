/**
* App.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
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
  	choch_charg:{
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

  	upload:function(data,callback){
  		if(data)
  		{
  			return callback(null,data)
  		}
  		else{
  			return callback('error parasing data',null)
  		}
  	},

  	create:function(data,callback ){
      	sails.log.debug(data);
      	if(data)
      	{
      		return callback(null,data);
      	}
      	else
      	{
      	 return callback('error in parsing data',null);
      	}
    },
    findOne:function(data,callback){
      sails.log.debug(data)
      if(data)
      {
        return callback(null,data);
      }
      else
      {
        return callback('error in parsing searching ',null);
      }
    }
  }
};

