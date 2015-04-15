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

  if($('body').find('.search-criteria').length > 0){
  	$('.footer-content').css("margin-top","0px");
  }
});

$('#advancedSearch').click(function(){
	$('#textSearch').removeAttr("name");
	$('.location-select').attr("name","area");
	$('.sport-select').attr("name","sport");

	$('.search-bar').css('padding','20% 0 24%');
	$('#advancedSearch').addClass('hide');
	$('#normalSearch').removeClass('hide');
	$('.locations').removeClass('hide');
	$('.sports').removeClass('hide');
	$('.venue-search').addClass('hide');
	$('.adv-search').css({
		'width':'17%',
		'margin-right':'7%'
		// 'padding':'22% 0'
	});
	$('.search-button').css({
		'top':'-2px'
	});

	$('#searchArea').attr("action","/searchAdvance");
});

$('#normalSearch').click(function(){
	$('#textSearch').attr("name","searchString");
	$('.location-select').removeAttr("name","area");
	$('.sport-select').removeAttr("name","sport");

	$('.search-bar').css('padding','24% 0');
	$('#advancedSearch').removeClass('hide');
	$('#normalSearch').addClass('hide');
	$('.locations').addClass('hide');
	$('.sports').addClass('hide');
	$('.venue-search').removeClass('hide');
	$('.adv-search').css({
		'width':'14%',
		'margin-right':'8%'
		// 'padding':'24% 0'
	});
	$('.search-button').css({
		'top':'-4px'
	});

	$('#searchArea').attr("action","/textSearch");
});

$('.fb-button').click(function(){
	window.location.href='http://www.facebook.com/login';
});

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
		var selectedArea = $.trim($('.location-select option:selected').val());
		var selectedSport = $.trim($('.sport-select option:selected').val());

		if($.trim($('.location-select option:selected').val()) === "location"){
			event.preventDefault();	
		}else if($.trim($('.sport-select option:selected').val()) === "sports"){
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
	var thisMap = $(this).parents('.individual-result').siblings('#googleMap');
	console.log($(this).parents('.individual-result').siblings('#googleMap'));
	var locX = $(this).parents('.individual-result').siblings('#googleMap').data('loc-x');
	var locY = $(this).parents('.individual-result').siblings('#googleMap').data('loc-y');
	$(this).parents('.individual-result').siblings('#googleMap').slideToggle(400);
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
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1579003515650007',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    	console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

// <!--
//   Below we include the Login Button social plugin. This button uses
//   the JavaScript SDK to present a graphical Login button that triggers
//   the FB.login() function when clicked.
// -->

// <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
// </fb:login-button>

// <div id="status">
// </div>
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