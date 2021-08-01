var adBlockEnabled = false;
var dialogClosed = false; //July 30 2020
var eazy_ad_unblocker_loaded = false; //Dec 13 2020

//alert(JSON.stringify(eazy_ad_unblocker_popup_params));

var eazy_ad_unblocker_msg_var = "#"+eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_message;

jQuery(function($){
	
	if(jQuery("#"+eazy_ad_unblocker_popupid.unblocker_id).height() > 0){ //wrapfabtest March 22 2021
		
	}
	else{
		jQuery("#eazy_ad_unblocker_loading").show();
	}
});

jQuery(document).ready(function($){
	
	var openingWidth = 0; 
	
	//Nov 11 2020
	var eazyAdUnblockerHolderDiv = $("<div>");
	$(eazyAdUnblockerHolderDiv).prop("id", eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder); //eazy_ad_unblocker_holder_id
	$(eazyAdUnblockerHolderDiv).addClass(eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder_class_name); //eazy_holder_class
	$("body").append(eazyAdUnblockerHolderDiv); 
	
	//End Nov 11 2020
	
	//calc width Dec 21 2020
	
	/****Dec 21 2020****/
	var eff_width = eazy_unblocker_width.unblocker_width;
	
	var is_not_number_flag = (isNaN(parseInt(eff_width)));
	
	var eff_width_full = 0;
	
	if(is_not_number_flag)
	{
		eff_width_full = 0;
	}
	else
	{
		eff_width_full = parseInt(eff_width);
	}
	
	var effectiveWidth = (window.screen.width <= 540)?window.screen.width:((eff_width_full != 0 && eff_width_full < window.screen.width)?eff_width_full:'auto');
	
	function eazy_ad_unblocker_aspect_ratio()
	{
		
		jQuery(eazy_ad_unblocker_msg_var+" img").each(function(index, ui){
						
				if(window.screen.width <= jQuery(ui).prop("width"))
				{
				
					var aspectRatio = jQuery(ui).prop("width")/jQuery(ui).prop("height");
					
					var newWidth = (window.screen.width - 20);

					var newHeight = Math.floor(newWidth / aspectRatio);
					
					jQuery(ui).prop("height", newHeight);
					
					jQuery(ui).prop("width", newWidth);
				
				}
				else if(parseInt(jQuery(eazy_ad_unblocker_msg_var).css("width")) <= jQuery(ui).prop("width"))
				{
					/****Begin 13 Dec 2020****/
					
					var aspectRatio = jQuery(ui).prop("width")/jQuery(ui).prop("height");
					
					var newWidth = (parseInt(jQuery(eazy_ad_unblocker_msg_var).css("width")) - 20);

					var newHeight = Math.floor(newWidth / aspectRatio);
					
					jQuery(ui).prop("height", newHeight);
					
					jQuery(ui).prop("width", newWidth);
					
					/****End 13 Dec 2020****/
				}
			});
			
			jQuery(eazy_ad_unblocker_msg_var+" video").each(function(index, ui){
				
				if(window.screen.width <= jQuery(ui).prop("width"))
				{
				
					var aspectRatio = jQuery(ui).prop("width")/jQuery(ui).prop("height");
					
					var newWidth = (window.screen.width - 20);

					var newHeight = Math.floor(newWidth / aspectRatio);
					
					jQuery(ui).prop("height", newHeight);
					
					jQuery(ui).prop("width", newWidth);
				
				}
				else if(parseInt(jQuery(eazy_ad_unblocker_msg_var).css("width")) <= jQuery(ui).prop("width"))
				{
					/****Begin 13 Dec 2020****/
					
					var aspectRatio = jQuery(ui).prop("width")/jQuery(ui).prop("height");
					
					var newWidth = (parseInt(jQuery(eazy_ad_unblocker_msg_var).css("width")) - 20);

					var newHeight = Math.floor(newWidth / aspectRatio);
					
					jQuery(ui).prop("height", newHeight);
					
					jQuery(ui).prop("width", newWidth);
					/****End 13 Dec 2020****/
				}
			});
		
		//fix
		jQuery(eazy_ad_unblocker_msg_var).css("overflow-x", "hidden");
		
		//alert("end");
	}
	
	/****End Dec 21 2020***/
	
	$(eazy_ad_unblocker_msg_var).dialog({ //eazy_ad_unblocker_dialog_message
		modal: true,
		autoOpen: false,
		closeOnEscape: false,
		width: effectiveWidth,
		resizable: false,
		draggable: false,
		open: function(){
			
				dialogClosed = false; //July 30 2020
				
				var eazyParent = $(this).parents('.ui-dialog'); 
				
				var eazy_version_flag = eazy_version.version_flag;
				
				var eazyAdUnblockerOverlayParent = $(eazyParent).parents("#"+eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder);
				
				$(eazyAdUnblockerOverlayParent).children(".ui-widget-overlay:eq(0)").prop('id', eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_overlay );//'eazy_ad_unblocker_dialog-overlay'
				
				$("#"+eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_overlay).css({'background-color': '#000', 'opacity': eazy_opacity.opacity, 'z-index': 999998 }); //999998
				
				$(eazyParent).css({'z-index': 999999 }); 
				
				/*--adjust popup to follow scrolling 15 April 2020--*/
				
				var winHeight = $(window).height();
				
				var popupHeight = $(this).height();
				
				if(popupHeight < winHeight)
				{
					$(this).parent().css('position', 'fixed'); 
				}
				
				//blur
				
				$(eazyParent).prop('tabindex', -1)[0].focus(); 
				
				//end blur 
				
				/*----------end popup----------*/
				
				/**June 23 2020 close btn change**/
				if(eazy_close_btn.admin_btn_show == 'no')
				{
					
					$(eazyParent).prop("id", eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_parent); //"eazy_ad_unblocker_dialog-parent"
					
				}
					 
				/**end June 23, 2020 btn change**/
				/***for bootstrap themes Nov 29 2020***/
				
				var scriptElems = jQuery("script");
				
				var bootstrapOn = false;
				
				jQuery(scriptElems).each(function(index, elem){
					
					var src = jQuery(elem).prop("src");
					
					if(src.search("bootstrap") != -1)
					{
						bootstrapOn = true;
					}
					
				});
				if(bootstrapOn)
				{
					
					var btnSpan = jQuery('div.ui-dialog-titlebar button.ui-dialog-titlebar-close span.ui-icon-closethick').length;
					
					if(btnSpan == 0) //new code block to check if jquery dialog btn is being blocked by bootstrap Nov 29 2020
					{
						jQuery(eazy_ad_unblocker_msg_var).parent(".ui-dialog").children(".ui-dialog-titlebar").children("button.ui-dialog-titlebar-close").html("<span class='bootstrapOn'>X</span>");
					
						var color = jQuery(eazy_ad_unblocker_msg_var).parent(".ui-dialog").children(".ui-dialog-titlebar").css("background-color");
						
						jQuery(eazy_ad_unblocker_msg_var).parent(".ui-dialog").children(".ui-dialog-titlebar").children("button.ui-dialog-titlebar-close").children(".bootstrapOn").css({'color': color, 'font-size': '14px', 'position': 'relative', 'bottom': '4px'});
					}
				}
				
				/***for bootstrap themes Nov 29 2020 End***/
				
				/***For aspect ratio of images Dec 4 2020***/
				eazy_ad_unblocker_aspect_ratio();
				/*****end aspect ratio Dec 4 2020****/
				
		},
		close: function( event, ui ){  
			dialogClosed = true;
		},
		appendTo: '#'+eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder
	}); //Nov 11 2020 //eazy_ad_unblocker_holder id
	
	//$("#"+eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder).show();
					
	/**/				
	
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
		
		var popupParent = $(eazy_ad_unblocker_msg_var).closest(".ui-dialog"); //July 31 2020
		
		var popupHeight = $(popupParent).height(); //July 31 2020
		
		var fromTop = $(window).scrollTop();
		
		var docuHeight = $(document).height();
		
		var dialogBottom = $(popupParent).offset().top + $(popupParent).outerHeight(true); //July 31 2020
		
		var remaining = 0;
		
		if(popupHeight > window.innerHeight && popupHeight < docuHeight)
		{
			
			/******Begin Dec 13 2020*****/
			var dialog = popupParent; //July 31 2020
					
			var offset = dialog.offset();
			
			
			if(fromTop + window.innerHeight > dialogBottom && fromTop + window.innerHeight <= docuHeight)
			{
				//bottom of dialog reaches bottom of viewport
				if(eazy_ad_unblocker_loaded && direction == 'down')
				{
					
					$(popupParent).position({ my: 'bottom', at: 'bottom', of: window, using: function(param1, param2){
						
						//animation begin
						
						//console.log(st+ " " +pixels);
						
						var animationDuration = Math.round(1000 * 250 / docuHeight);  
						
						$(this).animate(param1, animationDuration , "linear"); 
						
						//end animation
						
					} });
				}
			}
			else if(fromTop <= offset.top || offset.top <= 0) 
			{
				//top of dialog reaches top of viewport
				if(eazy_ad_unblocker_loaded && direction == 'up')
				{
					
					
					$(popupParent).position({ my: 'top', at: 'top', of: window, using: function(param1, param2){
						
						//begin animation
						var animationDuration = Math.round(1000 * 250 / docuHeight);
						
						$(this).animate(param1, animationDuration , "linear"); 
						
						//end animation
						
					} });
				}
			} 
			
			/*****End Dec 13 2020*****/
			
		}
		else if(window.innerHeight > $(dialog).outerHeight(true)){ //Dec 13 2020
			/***Dec 13 2020****/
			
			var dialog = popupParent; //July 31 2020
			
			$(popupParent).position({ my: 'center', at: 'center', of: window });
			
			/***End Dec 13 2020****/
		}
		
	});	
	//end adjustment
	
});

jQuery(window).on("load", function($){
	
	jQuery('#eazy_ad_unblocker_loading').remove(); //loader
	
	//for better loading of dialog, not showing intermediate changes
	if(jQuery("#"+eazy_ad_unblocker_popupid.unblocker_id).height() > 0){ //wrapfabtest March 22 2021
		
	}
	else{
		
		//alert("hi");

		preventDeleteDialog();
						
		jQuery(eazy_ad_unblocker_msg_var).dialog("open");
						
	}
	//alert('loaded'); //works
	
	eazy_ad_unblocker_loaded = true;
	
	var maxWidth = Math.max.apply(Math, jQuery(eazy_ad_unblocker_msg_var+'>div').map(function(){ return jQuery(this).width(); }).get());
	
	if(jQuery(eazy_ad_unblocker_msg_var+" audio").width() < maxWidth)
	{
		jQuery(eazy_ad_unblocker_msg_var+" audio").css("width", maxWidth+'px');
	}
	
	jQuery(eazy_ad_unblocker_msg_var).css("height", "auto");
	
	var queryParam = eazy_ad_unblocker_msg_var;
	
	//alert(queryParam);
	
	var dialogParent = document.querySelector(queryParam).parentNode;
	
	//Nov 11 2020
	var appendToDiv = dialogParent.parentNode;
	//End Nov 11 2020
	
	//DOM event handlers
	
	let mList = document.body,
	options = {
	  childList: true,
	  subtree: true
	},
	observer = new MutationObserver(mCallback);
	
	//alert(eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder_class_name);

	function mCallback(mutations){
	  for (let mutation of mutations){		 
		 
		if (mutation.type === 'childList'){
			
		  //check only removal here!
		  
		  if(mutation.removedNodes.length > 0 && mutation.addedNodes.length == 0)
		  {
			  
			  for(var i = 0; i < mutation.removedNodes.length; i++)
			  {  
			  
				  if(
				  (mutation.removedNodes[i].hasAttribute('class') && mutation.removedNodes[i].getAttribute('class').search(eazy_ad_unblocker_popup_params.eazy_ad_unblocker_holder_class_name) != -1 && 
					 mutation.removedNodes[i].isEqualNode(appendToDiv))
					 ||
				  (mutation.removedNodes[i].hasAttribute('class') && mutation.removedNodes[i].getAttribute('class').search('ui-dialog') != -1 && 
					 mutation.removedNodes[i].isEqualNode(dialogParent))
					 || 
				  ((mutation.removedNodes[i].hasAttribute('class') && mutation.removedNodes[i].getAttribute('class').search('ui-widget-overlay') != -1) && 
				  (mutation.removedNodes[i].hasAttribute('id') && mutation.removedNodes[i].getAttribute('id') == eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_overlay))//'eazy_ad_unblocker_dialog-overlay'
				     ||
					((mutation.removedNodes[i].hasAttribute('id') && mutation.removedNodes[i].getAttribute('id') == eazy_ad_unblocker_popup_params.eazy_ad_unblocker_dialog_message) && 
					(mutation.removedNodes[i].hasAttribute('class') && mutation.removedNodes[i].getAttribute('class').search('ui-dialog-content') != -1))
					||
					(mutation.removedNodes[i].hasAttribute('class') && mutation.removedNodes[i].getAttribute('class').search('ui-dialog-titlebar') != -1)
				  ) //only jquery widget divs //Nov 11 2020 boolean condition change
				  {
					  if(!dialogClosed) //check if dialog was closed by clicking close btn or deleted directly from dev tools
					  {
						
						location.reload();
					  }
				  }
			  }  
		  }
		}
	  }
	}

	observer.observe(mList, options);
	
});
				
function preventDeleteDialog()
{
	////alert('bye');
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