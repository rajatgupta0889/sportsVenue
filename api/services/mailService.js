var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user : "harsh@mantralabsglobal.com",
		pass : "BroadSword10"
	}
});
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

exports.sendSignUpMail = function(data, cb) {
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    // from: 'HR <demo@hr.com>', // sender address
	    // to: 'harsh@mantralabsglobal.com', // list of receivers
	    to: data.email, //'harsh@mantralabsglobal.com'
	    subject: 'Sports Venue - Thank you for joining us!', // Subject line
	    text: '', // plaintext body
	    html: "<p style='margin:0;font-weight:bold;font-size:12pt;'>Dear "+data.username+",</p><br><p style='margin:0;font-size:12pt;'>Thank you for reaching us</p><p style='margin:0;font-size:12pt;'>This is your password:<span style='margin:0;color:rgb(83,209,48);font-weight:bold;'>"+data.userPwd+"</span></p><br><p style='margin:0;font-size:10pt;'>Thanks,</p><p style='margin:0;font-size:10pt;'>SV Team</p>" // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	    	// console.log(mailOptions);
	        console.log('Message sent: ' + info.response);
	        cb(null, info.response);
	    }
	});
}

exports.sendResetMail = function(data, cb) {
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    // from: 'HR <demo@hr.com>', // sender address
	    // to: 'harsh@mantralabsglobal.com', // list of receivers
	    to: data.email, //'harsh@mantralabsglobal.com'
	    subject: 'Sports Venue - New Password!', // Subject line
	    text: '', // plaintext body
	    html: "<p style='margin:0;font-weight:bold;font-size:12pt;'>Dear user,</p><br><p style='margin:0;font-size:12pt;'>Looks like you forgot your old password.</p><p style='margin:0;font-size:12pt;'>This is your new password:<span style='margin:0;color:rgb(83,209,48);font-weight:bold;'>"+data.userPwd+"</span></p><br><p style='margin:0;font-size:10pt;'>Thanks,</p><p style='margin:0;font-size:10pt;'>SV Team</p>" // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	    	// console.log(mailOptions);
	        console.log('Message sent: ' + info.response);
	        cb(null, info.response);
	    }
	});
}

exports.sendFacebookSignUpEmail = function(data, cb){
	var mailOptions = {
	    // from: 'HR <demo@hr.com>', // sender address
	    // to: 'harsh@mantralabsglobal.com', // list of receivers
	    to: data.email, //'harsh@mantralabsglobal.com'
	    subject: 'Sports Venue - Thank you for joining us!', // Subject line
	    text: '', // plaintext body
	    html: "<p style='margin:0;font-weight:bold;font-size:12pt;'>Dear "+ data.username +",</p><br><p style='margin:0;font-size:12pt;'>Thank you for reaching us.<br>You have successfully signed up with SportsVenue</p><br><p style='margin:0;font-size:10pt;'>Thanks,</p><p style='margin:0;font-size:10pt;'>SV Team</p>" // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	    	// console.log(mailOptions);
	        console.log('Message sent: ' + info.response);
	        cb(null, info.response);
	    }
	});
}

exports.sendFeedbackMail = function(data ,cb){
	var mailOptions = {
	    // from: 'HR <demo@hr.com>', // sender address
	    // to: 'harsh@mantralabsglobal.com', // list of receivers
	    to: 'harsh@mantralabsglobal.com',
	    subject: 'Sports Venue - User feedback/complaint', // Subject line
	    text: '', // plaintext body
	    html: "<p style='margin:0;font-weight:bold;font-size:12pt;'>Dear Sports Venue Administrator,</p><br><p style='margin:0;font-size:10pt;'>The following feedback/complaint has been recieved from a user</p><br><p style='margin:0;font-size:12pt;'>user-name: "+data.user_name+"<br>user-email-id: "+data.user_mail+"<br>Subject: "+data.user_subject+"<br>Content: "+data.user_content+"<br>Contact Number: "+data.user_number+"</p>"
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	    	// console.log(mailOptions);
	        console.log('Message sent: ' + info.response);
	        cb(null, info.response);
	    }
	});
}