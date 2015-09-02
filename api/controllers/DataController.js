/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		res.view();
	},
	GetComponentList : function(req, res){
		sails.log.debug('in');
		var text = req.body;

		// Data.find({ or : [
  //   { faculty_name: 'Anup'  },
  //   { faculty_add: 'teacher' }
  // ]})

		Data.find({sport_avail:{'like':'%A%'}}).exec(function (err, response){
                if (err) return res(err);
                else
                {
                res.json(response); 
                } 
        });
    },

	userinfo: function(req,res){
	  
		Data.userinfo(req.body,function (err,user){
			if(err){
				res.negotiate(err);
			}
			else
			{
				res.json(user);
			}
		});
	}
};

