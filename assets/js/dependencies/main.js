$('.search-button').on('click',function(){
	window.location.href="/grounds";
});

$('#advancedSearch').click(function(){
	$('#advancedSearch').addClass('hide');
	$('#normalSearch').removeClass('hide');
	$('.locations').removeClass('hide');
	$('.sports').removeClass('hide');
	$('.venue-search').addClass('hide');
	$('.adv-search').css({
		'width':'17%',
		'margin-right':'7%',
		'padding':'22% 0'
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
		'margin-right':'8%',
		'padding':'24% 0'
	});
});