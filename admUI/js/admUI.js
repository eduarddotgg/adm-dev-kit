
$(document).ready(function($){

	
	var nodeServerURL = 'http://';
	var browserSyncServerURL = 'http://';
	var documentationURL = 'http://';
	var githubnURL = 'http://';
	var facebooknURL = 'http://';
	var twitternURL = 'http://';

	var qrCodeTopText = 'Use this QR-code to open current URL on on any other device. Current IP address is';
	var qrCodeBottomText = 'Make sure that all devices are on the same local network.';

	$("body").prepend( "<div class='admUI'> <div class='col qr'> <div class='qr-code-wrapper'> <p>" + qrCodeTopText + "</p> <div class='qr-code'></div> <p>" + qrCodeBottomText + "</p> </div> </div> <div class='col'> <div class='links-block'> <h2>Static server and Browser-Sync</h2> <ul> <li><a href='#'>Static server</a></li> <li><a href='#'>Browser-Sync</a></li> </ul> </div> </div> <a href='#' class='admUI-close-btn'>close</a> </div> <div class='admUI-show'><a href='#' class='admUI-show-btn'>show</a></div>" );

	$('.admUI-show-btn').on('click', function(event){
		event.preventDefault();
		$('.admUI').addClass('show');
		$('.admUI-show').addClass('hide');
	});

	$('.admUI-close-btn').on('click', function(event){
		if( $(event.target).is('.admUI') || $(event.target).is('.admUI-close-btn') ) { 
			$('.admUI').removeClass('show');
			$('.admUI-show').removeClass('hide');
			event.preventDefault();
		}
	});
});