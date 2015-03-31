$(document).ready(function(){
  $('.bxslider').bxSlider({
  	autoControls :false,
  	auto:true,
  	pause: 8000,
  	speed: 2000
  });
});

//for getting all grounds on the click of search buttons without any criteria
// $('.search-button').on('click',function(){
// 	window.location.href="/grounds";
// });

$('#advancedSearch').click(function(){
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
		'top':'8px'
	});
});

$('#normalSearch').click(function(){
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
});

$('.location-criteria').find('p').click(function(){
	$('.location-criteria').find('p').addClass('hide');
	$('.location-criteria').find('select').removeClass('hide');
});

$('.sport-criteria').find('p').click(function(){
	$('.sport-criteria').find('p').addClass('hide');
	$('.sport-criteria').find('select').removeClass('hide');
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
	$('#dayDob').empty();
	$('#monthDob').empty();
	$('#yearDob').empty();

	for(var i=0;i<31;i++)
		$('#dayDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');

	for(i=0;i<12;i++)
		$('#monthDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');

	for(i=1930;i<=2010;i++)
		$('#yearDob').append('<option value='+(i+1)+'>'+(i+1)+'</option>');				
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

// $('body').click(function(){
// 	if($('#userOptions').hasClass('open'))
// 		$('#userOptions').slideUp(200);
// });