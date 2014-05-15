=== Stella plugin ===
Contributors: Ruslan.Khakimov
Donate link: http://store.theme.fm/plugins/stella/
Tags: languages, localization, multilanguage
Requires at least: 3.3
Tested up to: 3.9
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Simple and effective way to build a multi-language website.

== Description ==  

Stella plugin for WordPress is designed to give the user a simple and effective way to build a multi-language website. 
It makes it possible to easily produce and manage multilingual content.

This free version of stella plugin has some limitations.

Here is a quick overview of free version features:

1. Multi-language from the box - everything required already included
2. Quick and simple configuration.
3. Host versatility - use pre-configured host names or form automatic URLs.
4. Multilingual post content editing via tabs in post edit WordPress section
5. Website title, description and menu localization
6. Language switching widget 
7. Plugin localization support

Learn more about full version on 
http://store.theme.fm/plugins/stella/

== Installation ==

Upload plugin to your WordPress site the way you are accustomed to. The simplest way is to upload plugin via WordPress admin panel (Plugins -> Add new -> Upload).
After successfull upload, check folder access rights. It should allow user and your wordpress group (www-data by default) to access plugin folder files (chmod 664 on Linux and MacOS systems )
Activate plugin via (Plugins -> Installed plugins -> stella plugin -> Activate).
After plugin activation, you will need to configure the plugin for correct work. You must have admin rights to configure plugin. Open Settings -> stella language.

This is a plugin options page. Here you must select languages that you are waте to support. After language selection you should specify URL forming options. 
You can use auto-generated URLs or configure host names for multiple languages via your provider service. Either way will work, so it’s up to you which way to choose. This option is selected via “use hosts” checkbox. If it is selected, you must define pre-arranged host names. With this option unchecked, plugin will form URLs automatically like http://yoursite.com/language/post_name
That’s all - plugin is installed and ready to go.

Currently plugin is translated to: Russian, English, Italian.

That’s all - we hope that you’ll like our plugin. Suggestions, questions and other feedback are welcomed. Email: support@theme.fm

== Frequently Asked Questions ==

= How to include language switcher somewhere in site? =
Insert this code in your theme file: 
`<?php the_widget( "Stella_Language_Widget"); ?>`

= How to change lang names? =
Use stella-lang-codes filter. 
Example. Add this code in your theme functions.php file: 
`add_filter( 'stella-lang-codes', 'change_lang_names');
function change_lang_names( $langs ){
	$langs['en'] = 'ENG';
	$langs['ru'] = 'RUS';
	return $langs;
}`
The same to add new language: 
`add_filter( 'stella-lang-codes', 'add_new_langs');
function add_new_langs( $langs ){
	$langs['kl'] = 'Klingon';
	return $langs;
}`
Resave stella settings to make effect!

= Some content doesn't load because of the permalink structure. What would be the best solution to fix this? =
Please, use get_template_directory_uri function to link your theme files.

= I want to use this domains: site.com (for English) and site.nl (for Dutch) How would I set this up at my host? Do I point all the domains to the same directory Wordpress is installed in? =
Yes, you need to configure your web server to point all this domains to the same directory. ( you can use aliases or virtual hosts )

= My post title ( post content, site title ) not translated in frontend =
Check your theme for $post->post_title code. Use get_the_title() function instead. Because Stella uses the_title filter.

= What do I get with the full version? =

1. Post tags, categories and custom taxonomies localization
2. Post featured images localization
3. Admin bar language switching
4. Multisite support

You can find more information in documentation http://store.theme.fm/files/2012/06/Stella-Documentation.pdf
For any questions mail to support@theme.fm

== Screenshots ==

1. Plugin options page
2. Editing post content via tabs

== Changelog ==

= 1.4 =
- content_url() & includes_url() instead hardcoded 'wp-content', 'wp-includes'
- Wordpress installed in some subdirectories
- API: stella_translate_filter function
- API: stella_localize_taxonomies function
- API: stella_menu_language_switcher_item_html filter
- widgetkit plugin compatiblity
- visual composer plugin compatiblity
- menu language switcher
= 1.3 =
Wordpress in subfolder support
Query mode support ( non-permalinks situation )
API updates
= 1.2 =
Plugin release.