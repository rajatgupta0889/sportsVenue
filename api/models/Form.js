/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
  attributes: 
  {
  	faculty_name:{
  		type: 'string',
  		required: true
  	},
  	faculty_add:{
  		type:'string',
  		required: true
  	},
  	own_first_name:{
  		type:'string',
  		required: true
  	},
  	own_middle_name:{
  		type:'string'
  	},
  	own_last_name:{
  		type:'string'
  	},
  	own_email:{
  		type:'string',
  		required:true
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
  		type:'string',
  		required:true
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
  	 }
  	// toJson: function(){
  	// 	var obj = this.toObject();
  	// 	delete obj.password;
  	// 	delete obj._csrf;
  	// 	delete obj.createdAt ;
  	// 	delete obj.updateAt;
  	// 	return obj;
  	// }
  }
};

