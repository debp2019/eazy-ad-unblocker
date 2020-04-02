<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
 
/**
* Plugin Name: Eazy Ad Unblocker
* Plugin URI: https://myplugins.net/demo
* Description: Prevent ad blockers from blocking ads on your site. 
* Version: 1.0
* Author: Pratyush Deb
* Author URI: https://myplugins.net/
* Text Domain: eazy-ad-unblocker
* Domain Path: /languages
**/

//Front-end
function eazy_ad_unblocker_dialog_head_func()
{
	wp_enqueue_style("jquery-ui-css", plugins_url('css/themes/redmond/jquery-ui.min.css', __FILE__)); //include css locally
	
} 

add_action("wp_head", "eazy_ad_unblocker_dialog_head_func");

function eazy_ad_unblocker_add_jquery_ui()
{
	
		if ( ! wp_script_is( 'jquery'))
		{
			//Enqueue
			wp_enqueue_script( 'jquery' ); 
		}
	
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-widget');
        wp_enqueue_script('jquery-ui-mouse');
        wp_enqueue_script('jquery-ui-dialog');
        wp_enqueue_script('jquery-ui-button');
		
		wp_enqueue_script('jquery-ui-position');
		wp_enqueue_script( "eazy_custom", plugins_url("eazy-ad-unblocker/js/custom.js", dirname(__FILE__)), array('jquery'), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'eazy_ad_unblocker_add_jquery_ui' );

function eazy_ad_unblocker_func_frontend()
{
	
	$unblock_option = get_option("eazy-ad-unblocker-settings");
	
	$unblock_option = sanitize_option( "eazy-ad-unblocker-settings", $unblock_option ); //sanitize retrieved option
	
	$unblock_array = $unblock_option;
	
	$content = eazy_ad_unblocker_get_content($unblock_array["text"]);
		
	$title = $unblock_array["title"];
		
	$opacity = $unblock_array["opacity"];
	
	wp_localize_script("eazy_custom", "eazy_opacity", array("opacity"=>$opacity));
	
	?>
	<div id="eazy_ad_unblocker_dialog-message" title="<?php echo esc_attr($title); //escape attribute value ?>">
	  <?php 
			$content = wp_check_invalid_utf8( $content, true );
			
			//protect oEmbed
			$allowed_html = array(
								  "iframe"=>array("src"=>array(), 
													"width"=>array(), 
													"height"=>array(), 
													"border"=>array(), 
													"class"=>array(),
													"name"=>array(),
													"id"=>array()),
								  "img"=>array("src"=>array(), 
												"alt"=>array(), 
												"width"=>array(), 
												"height"=>array(), 
												"class"=>array(),
												"id"=>array()),
								  "audio"=>array("width"=>array(), 
												 "height"=>array(), 
												 "controls"=>array("yes")), 
								  "video"=>array("width"=>array(), 
												"height"=>array(), 
												"controls"=>array("yes")), 
								  "source"=>array("src"=>array(), 
												"type"=>array("video/mp4",
															  "video/m4v",
															  "video/webm",
															  "video/ogv",
															  "video/x-ms-wmv",
															  "video/flv", 
															  "audio/ogg", 
															  "audio/mp3",
															  "audio/m4a",
															  "audio/wav",
															  "audio/wma") 
												)
									); //"video/mp4", "video/ogg", "audio/ogg", "audio/mpeg"
			
			$allowed_html = array_merge(wp_kses_allowed_html( "post" ), $allowed_html);
			
			$content = wp_kses($content, $allowed_html, array("http", "https")); //allowed html only
			
			echo $content;
	  ?>
	</div> 
	<style>
		.adBanner{
				background-color: transparent;
				height: 1px;
				width: 1px;
			}
		</style>
		<div id="wrapfabtest">
			<div class="adBanner">
			</div>
		</div>
	<?php
	
}

add_action("wp_footer", "eazy_ad_unblocker_func_frontend");

function eazy_ad_unblocker_get_content($encoded_html)
{
	
	$content = str_replace('\r', '', $encoded_html);
	
	$content = str_replace('\n', '', $content);
	
	$content = stripslashes($content);
	
	return apply_filters('the_content', $content);

}

//frontend finished

//Back-end
function eazy_ad_unblocker_admin_callback()
{
	$icon_url = plugins_url("images/eazy_admin_icon.png", __FILE__);
	
	add_menu_page("Eazy Ad Unblocker", "Eazy Ad Unblocker", "administrator", "eazy-ad-unblocker", "eazy_ad_unblock_admin_manage", $icon_url);
	
	add_options_page('Eazy Ad Unblocker', 'Eazy Ad Unblocker', 'manage_options', 'eazy-ad-unblocker', 'eazy_ad_unblock_admin_manage');
}

add_action("admin_menu", "eazy_ad_unblocker_admin_callback");


function eazy_ad_unblock_admin_manage()
{
	@session_start();
	$settings = array( 'textarea_name' => 'unblocker_text', 'width'=>'500px' );
	$content = "";
	
	$validate_msg=array();
	
	if(!empty($_POST["unblocker_save"]))
	{
		//verify nonce field
		
		if ( ! isset( $_POST['eazy_ad_unblocker_nonce'] ) || ! wp_verify_nonce( $_POST['eazy_ad_unblocker_nonce'], 'save_eazy_ad_unblocker_settings' ) )
		{
			wp_die(__("Form not verified", "eazy-ad-unblocker"));
		}
		
		$popup_title = sanitize_text_field($_POST["unblocker_title"]); //sanitization
		
		$popup_text = wp_kses_post($_POST["unblocker_text"]); //can't use sanitize_textarea_field as it removes everything including image tags 
		
		$popup_text = wp_check_invalid_utf8( $popup_text, true ); //strip out invalid utf-8
		
		$popup_opacity = floatval($_POST["unblocker_opacity"]); //sanitize float
		
		if(empty($popup_title))
		{
			$validate_msg[] = __("You must give a heading!", "eazy-ad-unblocker");
		}
		
		if(empty($popup_text))
		{
			$validate_msg[] = __("You must give a text!", "eazy-ad-unblocker");
		}
		
		if((!filter_var($popup_opacity, FILTER_VALIDATE_FLOAT) && !filter_var($popup_opacity, FILTER_VALIDATE_INT)) && $popup_opacity != 0)
		{
			$validate_msg[] = __("Opacity must be a number!", "eazy-ad-unblocker");
		}
		
		if(empty($validate_msg))
		{
			
			$unblock_settings = array("title"=>$popup_title, "text"=>$popup_text, "opacity"=>$popup_opacity);
			
			update_option("eazy-ad-unblocker-settings", $unblock_settings);
			
			$_SESSION["success"] = "<div class='updated notice is-dismissible'><p>".__("Settings saved!", "eazy-ad-unblocker")."</p></div>";
			
		}
		
	}
	
		$unblock_option = get_option("eazy-ad-unblocker-settings");
		
		$unblock_option = sanitize_option( "eazy-ad-unblocker-settings", $unblock_option );
		
		$unblock_array = $unblock_option;
		
		$content = stripslashes($unblock_array["text"]);
		
		$title = $unblock_array["title"];
		
		$opacity = $unblock_array["opacity"];
	
	?>
	<style>
		.wrap .button-secondary{ background-color: #0085ba !important; color: #fff !important; padding: 2px 16px!important; }
		
	</style>
	<h1><?php echo __("Eazy Ad Unblocker Settings", "eazy-ad-unblocker"); //echo "Eazy Ad Unblocker Settings"; ?></h1>
	<?php if(isset($_SESSION["success"])){ echo $_SESSION["success"]; unset($_SESSION["success"]); } ?>
	<?php if(is_array($validate_msg)){ 
				foreach($validate_msg as $msg)
				{
					?>
					<div class="error notice"><p><?php echo $msg; ?></p></div>
					<?php
				}
			}		?>
	<div id="wpwrap">
	<div class="wrap">
	<form action="" method="POST" >
	<?php wp_nonce_field( 'save_eazy_ad_unblocker_settings', 'eazy_ad_unblocker_nonce' ); ?>
	<table class="form-table" border="0" >
	<tr><td><?php echo __("Popup Title", "eazy-ad-unblocker"); ?></td><td><input type="text" name="unblocker_title" size="50" value="<?php echo $title; ?>" maxlength="200" /></td></tr>
	<tr><td><?php echo __("Popup Body", "eazy-ad-unblocker"); ?></td><td><?php wp_editor( $content, "adunblockText1", $settings ); ?><!----></td></tr>
	<tr><td><?php echo __("Popup Opacity", "eazy-ad-unblocker"); ?></td><td>
	<select name="unblocker_opacity" id="unblocker_opacity">
		<?php for($i = 0; $i < 11; $i++ )
		{ 
			
			?>
			<option value="<?php echo $i * 0.1; ?>" ><?php echo $i * 10; ?> %</option>
			<?php 
		}	?>		
	</select>
	<script>jQuery(document).ready(function($){ $("#unblocker_opacity").val(<?php echo $opacity; ?>); });</script>
	</td></tr>
	<tr><td><input type="submit" name="unblocker_save" value="<?php echo __("Save", "eazy-ad-unblocker"); ?>" class="button button-primary" /></td>
	<td>&nbsp;</td></tr>
	</table>
	</form>
	</div>
	</div>
	<?php 
}

function eazy_ad_unblocker_admin_redirects(){

    global $pagenow;

    /* Redirect */
    if($pagenow == 'admin.php'){
		
		if(!empty($_POST["unblocker_save"]) && $_POST["unblocker_save"] == "Save")
		{
			
			wp_redirect(admin_url('/admin.php?page=eazy-ad-unblocker'));
			exit;
        }
    }
	else if($pagenow == "options-general.php")
	{
		if(!empty($_POST["unblocker_save"]) && $_POST["unblocker_save"] == "Save")
		{
			
			wp_redirect(admin_url('/options-general.php?page=eazy-ad-unblocker'));
			exit;
        }
	}

}

add_action('admin_post', 'eazy_ad_unblocker_admin_redirects');


//visual editor fonts control

function eazy_ad_unblocker_editor_buttons( $buttons ) {
    array_unshift( $buttons, 'fontselect' ); 
    return $buttons;
  }

add_filter( 'mce_buttons_2', 'eazy_ad_unblocker_editor_buttons' );

//end visual editor

//modifications in plugin listing

add_filter('plugin_action_links_'.plugin_basename(__FILE__), 'eazy_ad_unblocker_add_plugin_page_settings_link');

function eazy_ad_unblocker_add_plugin_page_settings_link( $links ) {
	$links[] = '<a href="'.
		admin_url( 'options-general.php?page=eazy-ad-unblocker' ).
		'">'.__('Settings').'</a>';
		
	return $links;
}

//modifications finished 

//activate or deactivate hooks

function eazy_ad_unblocker_activate_func()
{
	
    register_uninstall_hook( __FILE__, 'eazy_ad_unblocker_uninstall_func' );
	
	$default_settings_array = array("title"=>"Demo Title", "text"=>"Please disable your adblocker or whitelist this site!", "opacity"=> 0.7);
	
	foreach($default_settings_array as $key=>$value)
	{
		$default_settings_array[sanitize_text_field($key)] = sanitize_text_field($value);
	}
	
	if(get_option("eazy-ad-unblocker-settings") == false)
	{
		update_option("eazy-ad-unblocker-settings", $default_settings_array);
	}
}
register_activation_hook( __FILE__, 'eazy_ad_unblocker_activate_func' );
 
// And here goes the uninstallation function:
function eazy_ad_unblocker_uninstall_func()
{
    //  codes to perform during unistallation
	
	delete_option("eazy-ad-unblocker-settings");  //delete plugin data
	
}

//Backend finished

//internationalization

function eazy_ad_unblocker_load_textdomain(){
	load_plugin_textdomain( 'eazy-ad-unblocker', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}

add_action( 'plugins_loaded', 'eazy_ad_unblocker_load_textdomain' ); 



?>