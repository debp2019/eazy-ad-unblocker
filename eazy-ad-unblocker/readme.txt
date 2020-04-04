=== Eazy Ad Unblocker===

Contributors: debp85
Tags: anti-adblock, ad-unblocker
Requires at least: 3.9
Tested up to: 5.4.0
Requires PHP: 7.2
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
 
Eazy Ad Unblocker notifies the user if ad blockers like AdBlock, AdGuard AdBlocker, AdBlock Plus are blocking advertisements which you 
paintstakingly put on your site to monetize it. Your users must deactivate their adblockers or whitelist your site in their adblocker
settings.
 
== Description ==

Eazy Ad Unblocker works on Microsoft Edge, FireFox, Google Chrome and Opera browsers. If users have their adblocker on while surfing
the web in these browsers, they will be prompted to switch their adblocker off or whitelist the site they are currently viewing 
via a modal popup. Users will not be able to view the website content clearly, nor will they be able to view the source of the page 
they are on, unless they deactivate the adblocker or whitelist the site in their adblocker settings. There is an option to completely 
black-out the content in the popup background through opacity settings. The admin of the site can also configure the text and heading 
of the modal popup. 


== Installation ==

There are two ways to install the plugin once you have obtained the zip archive of the plugin.

Option 1: Unzip the plugin to install it

1.	Unzip the archive with the name beginning with eazy-ad-unblock.
2.	Connect to your website via FTP.
3.	Browse to '/wp-content/plugins/' directory in FTP.
4.	Upload the entire 'eazy-ad-unblock' folder to FTP.
5.	Login to the Admin Dashboard '/wp-admin' of your website. 
6.	Browse the plugins page. You will see 'Eazy Ad Unblocker' plugin in the listing.
7.	Activate the plugin in step 6 above.

Option 2: Upload the plugin archive as is

1.	Login to your admin dashboard '/wp-admin'.
2.	Under 'Plugins' in the left sidebar, you will see an 'Add New' menu. Click it.
3.	You will be taken to the plugin install page. Click 'Upload Plugin' button on top of this page.
4.	A form will open up prompting to upload a Zip file. Upload your plugin archive and click the submit button.
5.	Click the 'Activate Plugin' button under the 'Plugin installed successfully.' message.
6.	You will see the message 'Plugin Activated' on the plugin listing page.

IMPORTANT: Either way, you need to configure the plugin for first-time use in your site.

1.	Click on the 'Eazy Ad Unblock' menu in the left sidebar of your admin dashboard.
2.	Configure your popup according to your needs on the page that opens up.
3.	You can enter the title, body text and opacity of the popup background. An opacity of 100% 
	blacks out the content behind the popup. Opacity of 0% will make the content behind the popup 
	completely visible or, in other words, the popup background will be completely transparent.
4.	Although you can add media in the body text, avoid using wallpapers thousands of pixels tall or wide.
	Likewise, do not add videos that are hundreds of megabytes in size.
5.	Don't forget to click 'Save' at the bottom.

== Testing == 

Browse to the site where you installed this plugin.
To test the popup, activate the ad blocker in your browser for the site.
Refresh your page if it does not auto-refresh. You should see a popup and verify that 
it cannot be dismissed in any way except disabling your adblocker. You should also not be 
able to view source for the page you are on by pressing Ctrl+U.   
 

 
== Frequently Asked Questions ==
 
Q1.	I installed and activated this plugin. But I did not see a proper modal popup with any proper message.
	What's wrong?

A1. The plugin needs to be configured for first-time use after installation and activation: 

	1.	Click on the 'Eazy Ad Unblock' menu in the left sidebar of your admin dashboard.
	2.	Configure your popup according to your needs on the page that opens up.
	3.	You can enter the title, body text and opacity of the popup background. An opacity of 100% 
		blacks out the content behind the popup. Opacity of 0% will make the content behind the popup 
		completely visible or, in other words, the popup background will be completely transparent.
	4.	Although you can add media in the body text, avoid using wallpapers thousands of pixels tall or wide.
	5.	Don't forget to click 'Save' at the bottom.
	6.	Verify that a proper popup shows up by making your adblocker active for your site.
	
	
Q2.	I activated and configured the plugin. Then I activated my adblocker for my site. But I don't get any popup. Why?

A2. You need to refresh the page in the browser after activating the ad blocker. 
 
  
== Screenshots ==

1. The screenshot-1.png shows the demo modal popup that appears in the frontend when the plugin has been installed and activated.  

2. The screenshot-2.png shows the modal popup as it appears on the front-end after editing. The background is black because the opacity is 100%.
	The body of the popup shows that html content as well as media can be added to it. 

3. The screenshot-3.png shows the admin section of the plugin where you can configure the settings such as title, body text and opacity.

 
== Features ==
 
The following features exist in this plugin:
 
1.	It prevents users from using the site when adblockers are active for them.
2.	There is no way to dismiss the popup without deactivating the ad blockers.
3.	The users cannot view the source of the page they are on when the plugin is active.
4.	The popup background opacity can be adjusted.
5.	The user also cannot view or use web developer tools to bypass the popup or view the popup html.
6.	The popup auto-scales to the content visible in it.
7.	The plugin checks whether ad blockers are on or not, not if the page has ads.
8.	The popup's title, text and opacity are editable. You can also add media such as images, videos and 
	audio clips to the body text. Audio and video are HTML5 based.
