	/**
	 * formController
	 *
	 * @description :: Server-side logic for managing forms
	 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
	 */

	module.exports = {

		new:function(req,res){

			res.locals.flash = _.clone(req.session.flash);
			res.view();	
			req.session.flash = {};
		},
		create:function(req,res,next){
			
			if(req.body.coll_mantra == undefined)
			{
				req.body.coll_mantra = '';
			}
			if(req.body.on_book_faci == undefined)
			{
				req.body.on_book_faci = '';
			}
			if(req.body.coach_sport == undefined)
			{
				req.body.coach_sport = '';
			}
			if(req.body.req_equp == undefined)
			{
				req.body.req_equp = '';
			}
			if(req.body.spec_time == undefined)
			{
				req.body.spec_time = '';
			}
			if(req.body.oth_branch == undefined)
			{
				req.body.oth_branch = '';
			}
			if(req.body.multi_field == undefined)
			{
				req.body.multi_field = '';
			}
			if(req.body.if_multi_field == undefined)
			{
				req.body.if_multi_field = '';
			}
			if(req.body.ground_book == undefined)
			{
				req.body.ground_book = '';
			}
			sails.log.debug(req.body.coll_mantra)
			
		Form.create(req.body,function (err,form){
				if(err){
					sails.log.debug(err)
					req.session.flash={
						err:err
					}

					return res.redirect('/form/new');

				}
				else
					//res.json(form)
					res.redirect('/form/show/'+form.id);
					req.session.flash= {};
			});
		},

		show:function(req,res,next){
			Form.findOne(req.param('id'),function  (err,form){
				if(err) return next(err);
				// if(!form) return next();
				else
				{
				
				}
				res.view({
					form: form
				});
			});
		},

		index:function(req,res,next){
			Form.find(function  (err,form){
				if(err) return next(err);

				res.view({
					form: form
				});
			});
		},
		edit:function(req,res,next){
			Form.findOne(req.param('id'),function (err,form){
				if(err) return next(err);
				if(!form) return next();
				res.view({
					form: form
				});
			});
		},
		update:function(req,res,next){
			Form.update(req.param('id'),req.body,function (err){
				if(err) {
					return res.redirect('/form/edit/'+req.param('id'));
				}
				res.redirect('/form/show/'+req.param('id'));
			});
		},
		destroy:function(req,res,next){
			Form.findOne(req.param('id'),function (err,form){
				if(err) next(err);
				if(!form) return next('form doesnt exist');


			Form.destroy(req.param('id'),function  (err,form){
				if(err) return next(err);
			});
			res.redirect('/form');
			});
		}
		
	};

