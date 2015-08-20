/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		res.view();
	},

	create:function(req,res){req.file('avatar').upload({dirname: '../../assets/upload'},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);

		   var imgpath = uploadedFiles[0].fd;
		   var img = imgpath.substr(imgpath.lastIndexOf('/upload'),uploadedFiles[0].fd.length);
		   console.log(req.params.all());
		    
		    // check for null;;
		if(req.body.faculty_name == null)
		{
			req.body.faculty_name = '';
		}
		if(req.body.faculty_add == null)
		{
			req.body.faculty_add = '';
		}
		if(req.body.own_first_name == null)
		{
			req.body.own_first_name = '';
		}
		if(req.body.own_middle_name == null)
		{
			req.body.own_middle_name = '';
		}
		if(req.body.own_last_name == null)
		{
			req.body.own_last_name = '';
		}
		if(req.body.own_email == null)
		{
			req.body.own_email = '';
		}
		 if(req.body.reg_membr_email == null)
		{
			req.body.reg_membr_email = '';
		}
		if(req.body.reg_membr_cont == null)
		{
			req.body.reg_membr_cont = '';
		}

		if(req.body.sport_avail == null)
		{
			req.body.sport_avail = '';
		}

		if(req.body.coach_sport == null)
		{
			req.body.coach_sport = '';
		}
		if(req.body.instruc_email == null)
		{
			req.body.instruc_email =''
		}

		if(req.body.choch_charg == null)
		{
			req.body.choch_charg = '';
		}
		if(req.body.coll_mantra == null)
		{
			req.body.coll_mantra = '';
		}

		if(req.body.req_equp == null)
		{
			req.body.req_equp = '';
		}
		if(req.body.equp_charg == null)
		{
			req.body.equp_charg = '';
		}
		if(req.body.spec_time == null)
		{
			req.body.spec_time = '';
		}
		if(req.body.specific_time == null)
		{
			req.body.specific_time = '';
		}
		if(req.body.found_date == null)
		{
			req.body.found_date = '';
		}
		if(req.body.open_timing == null)
		{
			req.body.open_timing = '';
		}
		if(req.body.close_timing == null)
		{
			req.body.close_timing = '';
		}
		if(req.body.oth_branch == null)
		{
			req.body.oth_branch = '';
		}
		if(req.body.branch_detail == null)
		{
			req.body.branch_detail = '';
		}
		if(req.body.multi_field == null)
		{
			req.body.multi_field = '';
		}
		if(req.body.multi_field_name == null)
		{
			req.body.multi_field_name = '';
		}
		if(req.body.if_multi_field == null)
		{
			req.body.if_multi_field ='';
		}
		if(req.body.no_coach == null)
		{
			req.body.no_coach = '';
		}
		if(req.body.coach_name == null)
		{
			req.body.coach_name = '';
		}if(req.body.coach_age == null)
		{
			req.body.coach_age = '';
		}if(req.body.coach_exp == null)
		{
			req.body.coach_exp = '';
		}if(req.body.fee_col_1 == null)
		{
			req.body.fee_col_1 = '';
		}if(req.body.fee_col_2 == null)
		{
			req.body.fee_col_2 = '';
		}if(req.body.fee_col_3 == null)
		{
			req.body.fee_col_3 = '';
		}if(req.body.oth_requir == null)
		{
			req.body.oth_requir = '';
		}
		if(req.body.summ == null)
		{
			req.body.summ = '';
		}if(req.body.branch_own_first_name == null)
		{
			req.body.branch_own_first_name = '';
		}if(req.body.branch_own_middle_name == null)
		{
			req.body.branch_own_middle_name = '';
		}
		if(req.body.branch_own_last_name == null)
		{
			req.body.branch_own_last_name = '';
		}
		if(req.body.on_book_faci == null)
		{
			req.body.on_book_faci = '';
		}
		if(req.body.ground_book == null)
		{
			req.body.ground_book = '';
		}
		if(req.body.req_equp == null)
		{
			req.body.req_equp = '';
		}
		if(req.body.fee_ground==null)
		{
			req.body.fee_ground ='';
		}
		 
		 


		    // assign the img path with dataname 
		  	fileParams = {
                avatar: img,
             	faculty_name:req.body.faculty_name,
             	faculty_add: req.body.faculty_add,
             	own_first_name: req.body.own_first_name,
             	own_middle_name: req.body.own_middle_name,
             	own_last_name: req.body.own_last_name,
             	own_email: req.body.own_email,
             	on_book_faci: req.body.on_book_faci,
             	coll_mantra: req.body.coll_mantra,
             	reg_membr_email: req.body.reg_membr_email,
             	reg_membr_cont: req.body.reg_membr_cont,
             	sport_avail: req.body.sport_avail,
             	coach_sport: req.body.coach_sport,
             	choch_charg: req.body.choch_charg,
             	instruc_email: req.body.instruc_email,
             	req_equp: req.body.req_equp,
             	equp_charg: req.body.equp_charg,
             	spec_time: req.body.spec_time,
             	specific_time: req.body.specific_time,
             	found_date: req.body.found_date,
             	open_timing: req.body.open_timing,
             	close_timing: req.body.close_timing,
             	oth_branch: req.body.oth_branch,
             	branch_detail: req.body.branch_detail,
             	multi_field: req.body.multi_field,
             	multi_field_name: req.body.multi_field_name,
             	if_multi_field: req.body.if_multi_field,
             	no_coach: req.body.no_coach,
             	coach_name: req.body.coach_name,
             	coach_age: req.body.coach_age,
             	coach_exp: req.body.coach_exp,
             	fee_col_1: req.body.fee_col_1,
             	fee_col_2: req.body.fee_col_2,
             	fee_col_3: req.body.fee_col_3,
             	oth_requir: req.body.oth_requir,
             	summ: req.body.summ,
             	branch_own_first_name: req.body.branch_own_first_name,
             	branch_own_middle_name: req.body.branch_own_middle_name,
             	branch_own_last_name: req.body.branch_own_last_name,
             	ground_book: req.body.ground_book,
             	fee_ground: req.body.fee_ground


            };
             
		      // Grab the first file and use it's `fd` (file des
			  Image.create(fileParams, function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                return res.redirect('image/index');
            });
		});
	},
	index:function(req,res){
		Image.find(function(err,form){
			if(err) return res.err(err);

			else{
				sails.log.debug(form);
				res.view('image/index',{form:form})
				
			}
		})

	},
	

	destroy:function(req,res,next){
		Image.findOne(req.param('id'),function foundUser(err,user){
			if(err) next(err);
			if(!user) return next('User doesnt exist');


		Image.destroy(req.param('id'),function userDestroyed(err,user){
			if(err) return next(err);
		});
		res.redirect('Image/index');
		});
	}

};

