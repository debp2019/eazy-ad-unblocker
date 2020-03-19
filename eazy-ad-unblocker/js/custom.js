var shiftDialog = false;
jQuery(document).ready(function($){
	
	var openingWidth = 0;
	
	$("#eazy_ad_unblocker_dialog-message").dialog({
		modal: true,
		autoOpen: false,
		closeOnEscape: false,
		width: 'auto',
		resizable: false,
		open: function() {
				//fix dialog hidden by header problem	  
				$(".ui-widget-overlay").css({'background-color': '#000', 'opacity': eazy_opacity.opacity, 'z-index': 999998 });
				$(".ui-dialog").css({'z-index': 999999 });
				
		},
		close: function( event, ui ){  
						
			if($("#wrapfabtest").height() > 0)
			{
								
			} 
			else 
			{
								
				preventDeleteDialog();
								
				$("#eazy_ad_unblocker_dialog-message").dialog("open");
								
			} 
		}
	});
	
	var timer = setInterval(function()
	{
		
		if(shiftDialog){
			
			if(jQuery("div.ui-dialog").length > 0)
			{
				jQuery("div.ui-dialog").position({
					of: jQuery('.ui-widget-overlay'),
					my: 'center top',
					at: 'center top',
					offset: '0 0'
				});
				
				shiftDialog = false;
			}
			
		}
	}, '1000');
	
					
	if($("#wrapfabtest").height() > 0){
		
		clearInterval(timer);
		
	} else {

		preventDeleteDialog();
						
		$("#eazy_ad_unblocker_dialog-message").dialog("open");
						
	} 				
					
});

jQuery(window).on("load", function($){
	
	if(window.twttr !== undefined)
	{
		window.twttr.events.bind(
		  'rendered',
		  function(event){
			
			shiftDialog = true;
			
		});
	}
	//facebook
	
	if(window.FB !== undefined)
	{
		// In your onload handler
		window.FB.Event.subscribe('xfbml.render', function(event){ 
		
			shiftDialog = true;
			
		});
	}
	
	var maxWidth = Math.max.apply(Math, jQuery('#eazy_ad_unblocker_dialog-message>div').map(function(){ return jQuery(this).width(); }).get());
	
	if(jQuery("#eazy_ad_unblocker_dialog-message audio").width() < maxWidth)
	{
		jQuery("#eazy_ad_unblocker_dialog-message audio").css("width", maxWidth+'px');
	}
	
	jQuery("#eazy_ad_unblocker_dialog-message").css("height", "auto");
	
});
				
function preventDeleteDialog()
{
	//prevent inspect element right click
	document.addEventListener('contextmenu', function(e){
		e.preventDefault();
	});
					
	//prevent dev shortcuts on Edge, FF, Chrome, Opera
	document.onkeydown = function(e) {
		if(event.keyCode == 123) {
			return false;
		}
		if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
			return false;
		}
		if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
			return false;
		}
		if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
			return false;
		}
		if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
			return false;
		}
		
		//firefox
		if(navigator.userAgent.search("Firefox") > -1)
		{
			if(e.ctrlKey && e.shiftKey && e.keyCode == 'K'.charCodeAt(0)) {
				return false;
			}
		}
		
	}
}