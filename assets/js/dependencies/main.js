$(document).ready(function(){
  $('.bxslider').bxSlider({
  	autoControls :false,
  	auto:true,
  	pause: 8000,
  	speed: 2000
  });
});

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

$('.sign-in').click(function(){
	$('.modal').removeClass('hide');
});

$('.search-button').click(function(){
	var currentArea = $('.location-select option:selected').text();
	var currentSport = $('.sport-select option:selected').text();
	var obj = {
				"area" : currentArea,
		    	"sport" : currentSport
		};
	if(currentSport!=="Sports" && currentArea!=="Location"){
		// $.ajax({
		//     method:"POST",
		//     url:"/searchAdvance",
		//     data:obj,
		//     //contentType: 'json',
		//     dataType: 'json',
		//     success:function(response){
		//         console.log(response);
		//         // alert('hmmm');
		//         window.location.href='/searchAdvance';
		//     },
		//     error:function(e){
		//     	console.log(e);
		//         console.log('error');
		//     }
		// });
		$.post(
			'/searchAdvance',
			{area: currentArea , sport: currentSport},
			function(){
				window.location.href='/searchAdvance';
			})
		.fail(function(res){
			console.log(res.getResponseHeader("error"));
		});
	}else{
		alert('How about entering both the fields?');
	}
});