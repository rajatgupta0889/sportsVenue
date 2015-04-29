$(document).ready(function(){
  $('.bxslider').bxSlider({
  	autoControls :false,
  	auto:true,
  	pause: 8000,
  	speed: 2000
  });

  setTimeout(function(){
  	$('.alert-error-message').fadeOut(500);
  },5000);

  if(($('body').find('.search-criteria').length > 0) || ($('body').find('.signup-container').length > 0) || ($('body').find('.create-ground').length > 0) || ($('body').find('.create-feedback').length > 0)){
  	$('.footer-content').css("margin-top","0px");
  }
});

$('#advancedSearch').click(function(){
	$('#textSearch').removeAttr("name");
	// $('.city-select').attr("name","city");
	$('.location-select').attr("name","area");
	$('.sport-select').attr("name","sport");

	$('#advancedSearch').addClass('hide');
	$('#normalSearch').removeClass('hide');
	$('.locations').removeClass('hide');
	$('.sports').removeClass('hide');
	$('.venue-search').addClass('hide');
	if(window.innerWidth > 480){
		$('.adv-search').css({
			'width':'17%',
			'margin-right':'7%'
			// 'padding':'22% 0'
		});

		$('.search-button').css({
			'top':'-2px'
		});

		$('.search-bar').css('padding','20% 0 24%');
	}else{
		$('.search-bar').css('padding','35% 0 20%');
		$('.adv-search').css('width','100%');
	}

	$('#searchArea').attr("action","/searchAdvance");
});

$('#normalSearch').click(function(){
	$('#textSearch').attr("name","searchString");
	$('.location-select').removeAttr("name");
	$('.sport-select').removeAttr("name");
	// $('.city-select').removeAttr("name");

	
	$('#advancedSearch').removeClass('hide');
	$('#normalSearch').addClass('hide');
	$('.locations').addClass('hide');
	$('.sports').addClass('hide');
	$('.venue-search').removeClass('hide');

	if(window.innerWidth > 480){
		$('.adv-search').css({
			'width':'14%',
			'margin-right':'8%'
			// 'padding':'24% 0'
		});
		$('.search-button').css({
			'top':'-4px'
		});
		$('.search-bar').css('padding','24% 0');
	}else{
		$('.search-bar').css('padding','80% 0 20%');
	}

	$('#searchArea').attr("action","/textSearch");
});

// $('.fb-button').click(function(){
// 	window.location.href='http://www.facebook.com/login';
// });

$('#signIn').click(function(){
	$('#signInModal').removeClass('hide');
});

$('.user-name').click(function(){
	$('#userOptions').slideToggle(200);
});

$('#signUp').click(function(){
	$('#signUpModal').removeClass('hide');
	// $('#dayDob').empty();
	// $('#monthDob').empty();
	// $('#yearDob').empty();

	// for(var i=0;i<31;i++)
	// 	$('#dayDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');

	// for(i=0;i<12;i++)
	// 	$('#monthDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');

	// for(i=1930;i<=2010;i++)
	// 	$('#yearDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');				
});


$('#loginForm').submit(function(event){
	var email = $.trim($('#eId').val());
	var pwd = $.trim($('#pwd').val());
	var e;
	var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(email && emailRegEx.test(email))
		e=true;
	else
		e=false;

	if(e === false){
		alert('Please enter a valid email address!');
		event.preventDefault();
	}
});


$('#signUpForm').submit(function(event){
	var email = $.trim($('#emId').val());
	var username = $.trim($('#uName').val());
	var em, usn, phn, pwd1, pwd2, pwd;
	var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Check if the email field is empty. If yes then highlight the email field and show error message
	if(email === '' || email === null || email === undefined){
		$('#emId').css('border','1px solid red');
		if($('.email-input').find('span'))
			$('.email-input').find('span').empty();
		$('.email-input').append('<span style="color:red;font-size:10pt;">Cannot be left empty</span>');
		// alert('Email Id cannot be empty!');
		event.preventDefault();
	}

	//If email field has value then validate its value to check if its in correct format
	//if not then highlight email field and show error message
	if(email){
		if(emailRegEx.test(email) === true)
		{ 	
			if($('#emId').css('border','1px solid red')){
				$('#emId').css('border','none').css('border-bottom','1px solid #bebebe');
			}
			$('.email-input').find('span').remove();
		}
		else
		{	
			$('#emId').css('border','1px solid red');
			if($('.email-input').find('span'))
				$('.email-input').find('span').empty();
			$('.email-input').append('<span style="color:red;font-size:10pt;">Invalid Email address</span>');
			// alert('Please enter a valid email address!');
			event.preventDefault();
		}
	}	

	//Check if the username field is empty. If yes then highlight the username field and show error message
	//If username field has value then validate its value to check if its in correct format
	//if not then highlight username field and show error message
	if(username === '' || username ===null || email === undefined){
		// alert('Please enter at least your first name');
		$('#uName').css('border', '1px solid red');
		if($('.name-input').find('span'))
			$('.name-input').find('span').empty();
		$('.name-input').append('<span style="color:red;font-size:10pt;">Cannot be left empty</span>');
		event.preventDefault();
	}else{
		if($('#uName').css('border', '1px solid red')){
			$('#uName').css('border','none').css('border-bottom','1px solid #bebebe');
		}
		$('.name-input').find('span').remove();
	}

	//Check if gender is selected. If not then hightlight the field and show error message
	// if($('input[name=gender]:checked').length <= 0)
	// {
	// 	// alert('Please select a gender!');
	// 	if($('.gender-input').find('span'))
	// 		$('.gender-input').find('span').empty();
	// 	$('.gender-input').append('<span style="color:red;font-size:10pt;">Please select one of the options</span>');
	// 	$('.gender-radio').css('border', '1px solid red');
	// 	event.preventDefault();
	// }else{
	// 	$('.gender-radio').css('border','none');
	// 	$('.gender-input').find('span').remove();
	// }

	// var phNum = $.trim($('#contactNum').val());
	// var numReg = /^\d+$/;

	//check if the phNum(if given) is in valid format. If not then hightlight it and show error message
	// if(phNum && numReg.test(phNum))
	// {	
	// 	if($('#contactNum').css('border', '1px solid red')){
	// 		$('#contactNum').css('border','none').css('border-bottom','1px solid #bebebe');
	// 	}
	//  	$('.contact-input').find('span').remove();
	// }else{
	// 	// alert('Please enter a valid mobile number!');
	// 	$('#contactNum').css('border', '1px solid red');
	// 	if($('.contact-input').find('span'))
	// 		$('.contact-input').find('span').empty();
	// 	$('.contact-input').append('<span style="color:red;font-size:10pt;">Please enter a valid phone number</span>');
	// 	event.preventDefault();
	// }

	// pwd1 = $.trim($('#pwdOrig').val());
	// pwd2 = $.trim($('#pwdCopy').val());

	//check if the passwords are present or not. If empty then highlight it and show appropriate message
	//If they are present then check if both values are same or not
	//If not then highlight and show appt error message
	// if(pwd1 === '' || pwd1 === null || pwd1 === undefined || pwd2 === '' || pwd2 ===null || pwd2 ===undefined){
	// 	// alert('Password cannot be empty');
	// 	$('#pwdOrig').css('border', '1px solid red');
	// 	$('#pwdCopy').css('border', '1px solid red');
	// 	if($('.input-password').find('span'))
	// 		$('.input-password').find('span').empty();
	// 	$('.input-password').append('<span style="color:red;font-size:10pt;">Password cannot be left empty</span>');
	// 	event.preventDefault();
	// }else{
	// 	if((pwd1 && pwd2) && (pwd1 !== pwd2)){
	// 		// alert('Passwords dont match');
	// 		$('#pwdOrig').css('border', '1px solid red');
	// 		$('#pwdCopy').css('border', '1px solid red');
	// 		if($('.input-password').find('span'))
	// 			$('.input-password').find('span').empty();
	// 		$('.input-password').append('<span style="color:red;font-size:10pt;">Given passwords dont match</span>');
	// 		event.preventDefault();
	// 	}else{
	// 		if($('#pwdOrig').css('border', '1px solid red') && $('#pwdCopy').css('border', '1px solid red')){
	// 			$('#pwdOrig').css('border', 'none').css('border-bottom','1px solid #bebebe');
	// 			$('#pwdCopy').css('border', 'none').css('border-bottom','1px solid #bebebe');
	// 		}
	// 		$('.input-password').find('span').remove();
	// 	}
	// }
});

$('#searchArea').submit(function(event){
	if(!$('.locations').hasClass('hide')){
		var selectedCity = $.trim($('.city-select option:selected').val());
		var selectedArea = $.trim($('.location-select option:selected').val());
		var selectedSport = $.trim($('.sport-select option:selected').val());

		if($.trim($('.location-select option:selected').val()) === "area"){
			event.preventDefault();	
		}else if($.trim($('.sport-select option:selected').val()) === "sports"){
			event.preventDefault();
		}else if($.trim($('.city-select option:selected').val()) === "city"){
			event.preventDefault();
		}
	}
	if($('.locations').hasClass('hide')){
		if($.trim($('#textSearch').val()) === ""){
			alert('cannot be empty');
			event.preventDefault();
		}
	}
});

$('#toggleMap').click(function(){
	var thisMap = $(this).parents('.res-container').siblings('#googleMap');
	var locX = $(this).parents('.res-container').siblings('#googleMap').data('loc-x');
	var locY = $(this).parents('.res-container').siblings('#googleMap').data('loc-y');
	// $(this).parents('.individual-result').siblings('#googleMap').siblings().slideUp()
	$(this).parents('.res-container').siblings('#googleMap').slideToggle(200);
	initialize(locX,locY,thisMap);
});

function initialize(x,y, onThisMap) {
	var mapCenter = new google.maps.LatLng(x,y);
  	var mapProp = {
	    center:mapCenter,
	    zoom:16,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	};
  	var map=new google.maps.Map(document.getElementById('googleMap'),mapProp);
  
  	var marker = new google.maps.Marker({
  		position:mapCenter,
  	});
  	marker.setMap(map);
}

$('#resetPwd').click(function(event){
	$('#signInModal').modal('hide');
	// $('#resetModal').modal('show');
	$('#resetModal').removeClass('hide');
	// $('#signInModal').modal('hide').done($('#resetModal').modal('show'));
});

$('.close-popup').click(function(){
	$('.modal-backdrop').remove();
});


function statusChangeCallback(response) {
	//the response we get here contains the access token
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		userSignIn();
	}
	//  else if (response.status === 'not_authorized') {
	// 	  // The person is logged into Facebook, but not your app.
	// 	  console.log("The person is logged into Facebook, but not your app.");
	// } else {
	// 	// The person is not logged into Facebook, so we're not sure if
	// 	// they are logged into this app or not.
	// 	console.log('The person is not logged into Facebook.')
	// }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.

function checkLoginStateOnLogin() {
	FB.getLoginStatus(function(response) {
	  	statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1579003515650007',
		cookie     : true,  // enable cookies to allow the server to access the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
	});

	// FB.getLoginStatus(function(response) {
	// 	statusChangeCallback(response);
	// });
};

  // Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//we get the details from the facebook api and send the required data to our api
function userSignIn() { //Up
	FB.api('/me', function(response) { 
		$('<form action="/signupfb" method="POST">'+
			'<input type="hidden" name="username" value="'+response.name+'"/>'+
			'<input type="hidden" name="email" value="'+response.email+'"/>'+
			'<input type="hidden" name="gender" value="'+response.gender+'"/>'+
			'<input type="hidden" name="fbUserId" value="'+response.id+'"/>'+
			'</form>').submit();
	});
}

// $("#crtGrnd").submit(function(event){
// 	var sport = $.trim($("#gSport").val());
// 	var name = $.trim($("#gName").val());
// 	var info = $.trim($("#gInfo").val());
// 	var address = $.trim($("#gAddress").val());
// 	var area = $.trim($("#gArea").val());
// 	var city = $.trim($("#gCity").val());
// 	var x = $.trim($("#latX").val());
// 	var y = $.trim($("#longY").val());
// 	var num = $.trim($("#gNum").val());

// 	if(sport === "" || sport === undefined || sport === null){
// 		event.preventDefault();
// 		$("#gSport").css("border","1px solid red");
// 	}else if(name === "" || name === undefined || name === null){
// 		event.preventDefault();
// 	}else if(info === "" || info === undefined || info === null){
// 		event.preventDefault();
// 	}else if(address === "" || address === undefined || address === null){
// 		event.preventDefault();
// 	}else if(area === "" || area === undefined || area === null){
// 		event.preventDefault();
// 	}

// 	// if (!isNaN(x) && x.indexOf('.') != -1)
// 	if(x && isNaN(x) && x.indexOf('.')>= -1){
// 		event.preventDefault();
// 	}else{

// 	}

// 	if(y && isNaN(y) && y.indexOf('.')>= -1){
// 		event.preventDefault();
// 	}else{

// 	}
// });

$('#makeGround').click(function(){
	$('input').css('border','');
	$('textarea').css("border",'');
	var gndSport = $.trim($("#gSport").val());
	var gndName = $.trim($("#gName").val());
	var gndInfo = $.trim($("#gInfo").val());
	var gndAddress = $.trim($("#gAddress").val());
	var gndArea = $.trim($("#gArea").val());
	var gndCity = $.trim($("#gCity").val());
	var gndX, gndY;
	var gndNum = $.trim($("#gNum").val());

	var errorFlag = false;
	
	gndX = parseFloat(gndX);
	gndY = parseFloat(gndY);
	gndNum = parseInt(gndNum);

	if(gndSport === "" || gndSport === undefined || gndSport === null){
		$("#gSport").css("border","2px solid red");
		errorFlag = true;
	}
	if(gndName === "" || gndName === undefined || gndName === null){
		$("#gName").css("border","2px solid red");
		errorFlag = true;
	}
	if(gndInfo === "" || gndInfo === undefined || gndInfo === null){
		$("#gInfo").css("border","2px solid red");
		errorFlag = true;
	}
	if(gndAddress === "" || gndAddress === undefined || gndAddress === null){
		$("#gAddress").css("border","2px solid red");
		errorFlag = true;
	}
	if(gndArea === "" || gndArea === undefined || gndArea === null){
		$("#gArea").css("border","2px solid red");
		errorFlag = true;
	}
	if(gndCity === "" || gndCity === undefined || gndCity ===null){
		$("#gCity").css("border","2px solid red");
		errorFlag = true;
	}

	var numReg = /^\d+$/;

	//check if the gndNum(if given) is in valid format.
	if(gndNum && gndNum.length>10 && numReg.test(gndNum))
	{	
		//this means no error in number validation	
	}else{
		$('#gNum').css("border","2px solid red");
		errorFlag = true;
	}

	if(errorFlag === false){
		$.ajax({
			url: "http://maps.googleapis.com/maps/api/geocode/json?address="+gndAddress+"&sensor=false",
			type: "POST",
			success: function(res){
				// console.log(res.results[0].geometry.location.lat);
				gndX = res.results[0].geometry.location.lat;
				// console.log(res.results[0].geometry.location.lng);
				gndY = res.results[0].geometry.location.lng;
				$.post("/create",{
					sport : gndSport,
					groundName : gndName,
					groundInfo : gndInfo,
					address : gndAddress,
					area : gndArea,
					city : gndCity,
					phoneNum : gndNum,
					x : parseFloat(gndX),
					y : parseFloat(gndY)
				}).success(function(ground){
					// console.log(message);
					$('#crtGrnd').addClass('hide');
					$('.create-success').removeClass('hide');
					$('#viewGround').attr("href","/ground/"+ground.id);
				});
			}
		});
	}
});

$('#sendFeedback').click(function(){
	$('input').css('border','');
	$('textarea').css("border",'');

	var userName = $.trim($('#uName').val());
	var userMailId = $.trim($('#uEmail').val());
	var userSubject  = $.trim($('#uSubject').val());
	var infoStr = $.trim($('#uInfo').val());
	var userNumber = $.trim($('#uNum').val());

	var submitValue = true;

	var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(userMailId === '' || userMailId === null || userMailId === undefined || emailRegEx.test(userMailId) === false){
		$('#uEmail').css('border','2px solid red');
		submitValue = false;
	}

	if(userName === "" || userName === undefined || userName === null){
		$("#uName").css("border","2px solid red");
		submitValue = false;
	}

	if(userSubject === "" || userSubject === undefined || userSubject === null){
		$("#uSubject").css("border","2px solid red");
		submitValue = false;
	}

	if(infoStr === "" || infoStr === undefined || infoStr === null){
		$("#uInfo").css("border","2px solid red");
		submitValue = false;
	}

	if(userNumber === "" || userNumber === undefined || userNumber === null){
		$("#uNum").css("border","2px solid red");
		submitValue = false;
	}

	var numReg = /^\d+$/;
	
	if(userNumber.length === 10 && numReg.test(userNumber))
	{	
		//this means no error in number validation	
	}else{
		$('#uNum').css("border","2px solid red");
		submitValue = false;
	}

	if(submitValue === true){
		$.post("/send_feedback",{
			user_name : userName,
			user_mail : userMailId,
			user_subject : userSubject,
			user_content : infoStr,
			user_number : userNumber
		}).success(function(message){
			$('#feedbackForm').addClass('hide');
			$('.feedback-container h3:first').addClass('hide');
			$('.resp-success').removeClass('hide');
		});
	}

});

$('#reviewSlider').click(function(){
	var getUrl = $(this).data('url');
	var that = this;
	var element = $(that).parents('.res-container').siblings('#groundReviews');
	// element.find(".review-user-name").find('.delete-review').remove();
	element.find('.review-list').empty();
	element.find('.review-list').removeClass('hide');
	element.find('.review-form').addClass('hide');
	$.get(getUrl).success(function(data){
		if(data.length > 0){
			for(var i=0; i<data.length; i++){
				element.find('.review-list').append("<div class='single-review'><p class='individual-review'>"+data[i].review+"</p><p class='review-user-name' id='"+data[i].userId+"'>- <span>"+ data[i].userName + " at " +data[i].createdAt.substr(0,10) + "</span></p></div></div>");
				if(data[i].ownReview && (data[i].ownReview === true)){
					element.find("#"+data[i].userId).append("<div class='delete-review' data-delete-url=/review/"+data[i].id+" onclick='deleteOwnReview(this)'>Delete my review</div>");
				}
			}
		}else{
			element.find('.review-list').append("<div class='single-review'><p class='individual-review'>No reviews found for this ground. You can add your own review by clicking on the 'Add your review' button above</p><p class='review-user-name'><span></span></p></div></div>");
		}
		$(that).parents('.res-container').siblings('#groundReviews').slideToggle(200);
	});
});

$('#writeReview').click(function(){
	var that = this;
	if($('.user-name').length > 0){
		$(that).parent().siblings('.review-list').addClass('hide');
		$(that).parent().siblings('.all-ground-reviews').addClass('hide');
		$(that).parent().siblings('.review-form').removeClass('hide');
		$(that).addClass('hide');
		$('#givenReviews').removeClass('hide');
	}else{
		window.location.href = "/postsignup";
	}
});

$('#submitReview').click(function(){
	var that = this;
	var uReview = $.trim($('#uReview').val());
	var uId = $('#submitReview').data('user-id');
	var gId = $('#submitReview').data('ground-id');
	var uName = $('.user-name p').html();
	var uRating = $('input:radio[name=rating]:checked').val();

	var errorFlag = false;

	$('#groundReviews input').css("border","");
	$('.review-form').css("border","");

	if(uReview === '' || uReview === null || uReview === undefined){
		$('#uReview').css("border","2px solid red");
		errorFlag = true;
	}

	if($('input:radio[name=rating]:checked').length === 0){
		$('.rating-radios').css("border","1px solid red");
		errorFlag = true;
	}

	if(errorFlag === false){
		$.post("/createReview",{
			userId : uId,
			groundId : gId,
			review : uReview,
			rating : uRating,
			userName : uName
		}).success(function(data){
			$(that).parent().siblings('.review-list').removeClass('hide');
			$(that).parent().siblings('.all-ground-reviews').removeClass('hide');
			$(that).parent().siblings('.review-list').append("<div class='single-review'><p class='individual-review'>"+data.review+"</p><p class='review-user-name'>- <span>"+ data.userName + " at " +data.createdAt.substr(0,10) + "</span></p></div></div>");
			// $(that).parent().siblings('.all-ground-reviews').
			// $(that).parent().siblings('.review-list').find('.individual-review').html(data.review);
			// $(that).parent().siblings('.review-list').find('.review-user-name span').html(uName + " at " +data.createdAt.substr(0,10));
			if($('.all-ground-reviews').length > 0){
				location.reload();
			}
			$(that).parent().addClass('hide');
		});
	}
});

function deleteOwnReview(element){
	var val = confirm("Are you sure you want to delete your review?");
	var deleteUrl = $(element).data('delete-url');
	if(val === true){
		$.ajax({
			method: "DELETE",
			url: deleteUrl
		}).success(function(msg){
			$(element).parent().siblings('.individual-review').html(msg);
			$(element).parent().html("");
		});
	}
}

$('#givenReviews').click(function(){
	var that = this;
	$('#givenReviews').addClass('hide');
	$('#writeReview').removeClass('hide');
	$(that).parent().siblings('.review-list').removeClass('hide');
	$(that).parent().siblings('.all-ground-reviews').removeClass('hide');
	$(that).parent().siblings('.review-form').addClass('hide');
});

$('#deleteReview').click(function(){
	var that = this;
	var val = confirm("Are you sure you want to delete your review?");
	if(val === true){
		$.ajax({
			method: "DELETE",
			url: $(this).data('delete-url')
		}).success(function(msg){
			location.reload();
		});
	}
});

// $('#createReview').click(function(){
// 	var that = this;
// 	if($('.user-name').length > 0){
// 		$(that).parent().siblings('.review-list').addClass('hide');
// 		$(that).parent().siblings('.review-form').removeClass('hide');
// 	}else{
// 		window.location.href = "/postsignup";
// 	}
// });

// $('#showGrounds').click(function(){
// 	$('.admin-grounds').removeClass('hide');
// 	$('.admin-users').addClass('hide');
// 	$('.pending-data').addClass('hide');
// });

// $('#showUsers').click(function(){
// 	$('.admin-grounds').addClass('hide');
// 	$('.admin-users').removeClass('hide');
// 	$('.pending-data').addClass('hide');
// });

// $('#pending').click(function(){
// 	$('.admin-grounds').addClass('hide');
// 	$('.admin-users').addClass('hide');
// 	$('.pending-data').removeClass('hide');
// });

// $('#signIn').click(function(event){
// 	$("#signInModal").addClass('in');
// 	// $('#signInModal').css('display',"block !important");
// 	// event.stopPropagation();
// });

// $('body').click(function(){
// 	if($('#userOptions').hasClass('open'))
// 		$('#userOptions').slideUp(200);
// });