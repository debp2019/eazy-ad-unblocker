jQuery(document).ready(function($){
	
	$("#dialog-message").dialog({
		modal: true,
		autoOpen: false,
		closeOnEscape: false,
		width: 'auto',
		resizable: false,
		open: function() {
				//fix dialog hiddden by header problem	  
				$(".ui-widget-overlay").css({'background-color': '#000', 'opacity': eazy_opacity.opacity, 'z-index': 999998 });
				$(".ui-dialog").css({'z-index': 999999 });
		},
		close: function( event, ui ){  
						
			if($("#wrapfabtest").height() > 0) {
								
			} else {
								
				preventDeleteDialog();
								
				$("#dialog-message").dialog("open");
								
			} 
		}
	});
					
	if($("#wrapfabtest").height() > 0) {
						
	} else {

		preventDeleteDialog();
						
		$("#dialog-message").dialog("open");
						
	} 
					
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