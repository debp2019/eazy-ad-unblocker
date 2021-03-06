jQuery(document).ready(function($){
	
	var openingWidth = 0;
	
	function reloadOnDOMChange(type)
	{
		//logic to check DOM editing in Web Inspector		
		if(
		($("#eazy_ad_unblocker_dialog-message").length == 0 || 
		$("#eazy_ad_unblocker_dialog-message").css("display") == 'none' || 
		$("#eazy_ad_unblocker_dialog-message").css("visibility") == 'hidden') 
		|| ($("#eazy_ad_unblocker_dialog-message").closest(".ui-dialog").length == 0 || 
		$("#eazy_ad_unblocker_dialog-message").closest(".ui-dialog").css("display") == 'none' || 
		$("#eazy_ad_unblocker_dialog-message").closest(".ui-dialog").css("visibility") == 'hidden') 
		|| ($(".ui-widget-overlay").length == 0 || $(".ui-widget-overlay").css("display") == 'none' || 
		$(".ui-widget-overlay").css("visibility") == 'hidden' || $(".ui-widget-overlay").css("opacity") != eazy_opacity.opacity)
		)
		{
			
			window.location.href = window.location.href;
		}
	}
	
	if(getCookie('eazy_ad_unblocker_setBlur') == 'yes')
	{
		//prevent content access thru content click when modal dialog is deleted thru DOM inspector, by reloading page
		$(window).click(function(e){
			
			
			if($("#wrapfabtest").height() == 0)
			{
				reloadOnDOMChange('click');
								
			}
			
		});
		
		//prevent content access thru content scroll when modal dialog is deleted thru DOM inspector, by reloading page
	
		$(window).scroll(function(e){
			
			
			if($("#wrapfabtest").height() == 0)
			{
				
				reloadOnDOMChange('scroll');
			}
			
		});
		
		//prevent user from mousing over the document content
		$(window).mouseover(function(e){
			
			if($("#wrapfabtest").height() == 0)
			{
				
				reloadOnDOMChange('mouse over');
								
			}
			
		});
	}
	
	
	//when user clicks inside location bar or search box
	$(window).blur(function(){
		
		//set cookie
		setCookie('eazy_ad_unblocker_setBlur', 'yes', 1);
		
		//prevent content access thru content click when modal dialog is deleted thru DOM inspector, by reloading page
		$(window).click(function(e){
		
			
			if($("#wrapfabtest").height() == 0)
			{
				reloadOnDOMChange('click');
								
			}
			
		});
		
		//prevent content access thru content scroll when modal dialog is deleted thru DOM inspector, by reloading page
	
		$(window).scroll(function(e){
			
			
			if($("#wrapfabtest").height() == 0)
			{
				
				reloadOnDOMChange('scroll');
			}
			
		});
		
		//prevent user from mousing over the document content
		$(window).mouseover(function(e){
			
			if($("#wrapfabtest").height() == 0)
			{
				
				reloadOnDOMChange('mouse over');
								
			}
			
		});
		
	});
	
	
	$("#eazy_ad_unblocker_dialog-message").dialog({
		modal: true,
		autoOpen: false,
		closeOnEscape: false,
		width: 'auto',
		resizable: false,
		draggable: false,
		open: function() {
				//fix dialog hidden by header problem	  
				$(".ui-widget-overlay").css({'background-color': '#000', 'opacity': eazy_opacity.opacity, 'z-index': 999998 });
				$(".ui-dialog").css({'z-index': 999999 });
				
				/*--adjust popup to follow scrolling, works only when popup is shorter than viewport , 15 April 2020--*/
				
				var winHeight = $(window).height();
				
				var popupHeight = $(this).height();
				
				if(popupHeight < winHeight)
				{
					$(this).parent().css('position', 'fixed');
				}
				
				//blur April 26 2020
				
				$(this).parents('.ui-dialog').attr('tabindex', -1)[0].focus();
				
				//end blur April 26 2020
				
				/*----------end popup----------*/
				
		},
		close: function( event, ui ){  
						
			if($("#wrapfabtest").height() > 0)
			{
								
			} 
			else 
			{
				/***April 26 2020****/
				location.reload(); //April 26 2020
				
				//preventDeleteDialog();
								
				//$("#eazy_ad_unblocker_dialog-message").dialog("open");
				/****April 26 2020 end***/
								
			} 
		}
	});
	
					
	if($("#wrapfabtest").height() > 0){
		
	} else {

		preventDeleteDialog();
						
		$("#eazy_ad_unblocker_dialog-message").dialog("open");
						
	} 				
	
	
	//popup adjustment on scroll April 15 2020
	var lastScrollTop = 0;	
	
	$(window).scroll(function(e){
		
		var st = $(this).scrollTop();
		
		var direction = '';
		
		if (st > lastScrollTop){
			// downscroll code
			direction = 'down';
			
		} else {
			// upscroll code
			direction = 'up';
		}
		lastScrollTop = st;
				
		var popupHeight = $("#eazy_ad_unblocker_dialog-message").height();
		
		var fromTop = $(window).scrollTop();
		
		var docuHeight = $(document).height();
		
		var dialogBottom = $("#eazy_ad_unblocker_dialog-message").offset().top + $("#eazy_ad_unblocker_dialog-message").outerHeight(true);
		
		var remaining = 0;
		
		if(popupHeight > window.innerHeight && popupHeight < docuHeight)
		{
			if(window.innerHeight + fromTop >= dialogBottom) //don't change this logic
			{	
				
				$("#eazy_ad_unblocker_dialog-message").closest(".ui-dialog").position({ my: 'bottom', at: 'bottom', of: window });	
				
				
			}
			else{
				
				if(direction == 'up')
				{
					
					var dialog = $('#eazy_ad_unblocker_dialog-message');
					var offset = dialog.offset();
					dialogViewportOffsetTop = offset.top - $(document).scrollTop(); //don't change logic
					
					if(dialogViewportOffsetTop >= 0)
					{
						$("#eazy_ad_unblocker_dialog-message").closest(".ui-dialog").position({ my: 'top', at: 'top', of: window });
					}
				}
				
			}
			
		}
		
	});	
	//end adjustment
});

jQuery(window).on("load", function($){
	
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
		
		if(navigator.userAgent.search("Firefox") != -1)
		{

			if(e.ctrlKey && e.shiftKey && e.keyCode == 'K'.charCodeAt(0)){
				return false;
			}
			
		}
		
	}
}


//cookie related functions

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} 