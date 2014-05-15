<?php

/*
 * Usage: Everywhere
 */

if ( ! function_exists( 'stella_is_permalinks_enabled' ) ) {
	function stella_is_permalinks_enabled() {
		try{
			$permalink_page = parse_url( admin_url('/') . 'options-permalink.php' );
			if ( isset( $_POST['_wp_http_referer'] ) &&  $permalink_page['path'] == $_POST['_wp_http_referer'] && isset( $_POST['permalink_structure'] ) ) {
				if ( '' !=  $_POST['permalink_structure'] )
					return true;
				else
					return false;
			}

			if( is_multisite() )
				return '' != get_blog_option( get_current_blog_id(), 'permalink_structure' );
			else
				return '' !=  get_option( 'permalink_structure' );
		}catch (Exception $e){
			return false;
		}
	}
}

// Correct plugin path for symlinks case
if ( ! function_exists( 'stella_plugin_url') ) {
	function stella_plugin_url() {
		return trailingslashit( plugins_url( basename( dirname( __FILE__ ) ) ) );
	}
}
	
if ( ! function_exists( 'stella_file_exists' ) ) {
	function stella_file_exists( $path ) {
		return file_exists( dirname(__FILE__) . '/' . $path );
	}
}

if ( ! function_exists( 'is_permalinks_enabled' ) ) {
	function is_permalinks_enabled() {
		return stella_is_permalinks_enabled();
	}
}

if ( ! function_exists( 'stella_get_lang_list' ) ) {
	function stella_get_lang_list() {
		return apply_filters( 'stella_get_lang_list', array() );
	}
}

if ( ! function_exists( 'stella_get_current_lang' ) ) {
	function stella_get_current_lang() {
		return STELLA_CURRENT_LANG;
	}
}

if ( ! function_exists( 'stella_get_default_lang' ) ) {
	function stella_get_default_lang() {
		return STELLA_DEFAULT_LANG;
	}
}

if( !function_exists( 'stella_localize_taxonomies' ) ){
	function stella_localize_taxonomies( $taxonomies ){
		$function_body = '';
		if( ! is_array( $taxonomies ) )
			$taxs = explode(' ', $taxonomies );
		else 
			$taxs = $taxonomies;
		foreach ( $taxs as $t ){
			$function_body .= '$taxonomies[] = "' . $t . '";';
		}
		$function_body .= 'return $taxonomies;';
		
		add_filter( 'stella_custom_taxonomies',  create_function( '$taxonomies', $function_body ) );
	}
}

if ( ! function_exists( 'get_stella_options' ) ) {
	function get_stella_options() {
		$options = array();
		if( is_multisite() ) {
			$options = get_blog_option( get_current_blog_id(), 'stella-options');
		}else{
			$options = get_option('stella-options');
		}
		return $options;
	}
}

if ( ! function_exists( 'stella_is_language_exists' ) ) {
	function stella_is_language_exists( $lang_prefix ) {

		$options = get_stella_options();
		
		if( isset( $options['langs']['default']['prefix'] ) )
			if( $lang_prefix == $options['langs']['default']['prefix'] ) return true;
		
		if( isset( $options['langs']['others'] ) ){
			foreach( $options['langs']['others'] as $lang ){
				if( $lang_prefix == $lang['prefix'] )
					return true;
			}
		}
		return false;
	}
}

if ( ! function_exists( 'stella_add_language' ) ) {
	function stella_add_language( $lang_prefix, $default_lang = false,  $lang_host = '' ) {
				
		// get options
		$options = get_stella_options();
		if( isset( $options['use_hosts'] ) )
			if( '' == $lang_host && true == $options['use_hosts'] ) return false;
		$langs = stella_get_langs_codes();
		//change options
		if( $default_lang ){
			// check is this language already exists
			if( isset( $options['langs']['default']['prefix'] ) ){ 
				if( $lang_prefix == $options['langs']['default']['prefix'] ) return false;
			}else{
				$options['langs']['default']['prefix'] = $lang_prefix;
				$options['langs']['default']['name'] = $langs[$lang_prefix];
				$options['langs']['default']['host'] = $lang_host;
			}
		}else{
			// check is this language already exists
			if( isset( $options['langs']['others'] ) ){
				foreach( $options['langs']['others'] as $lang ){
					if( $lang_prefix == $lang['prefix'] )
						return false;
				}
			}
			$options['langs']['others'][$lang_prefix]['prefix'] = $lang_prefix;
			$options['langs']['others'][$lang_prefix]['name'] = $langs[$lang_prefix];
			$options['langs']['others'][$lang_prefix]['host'] = $lang_host;
		}
		
		// update options
		if( is_multisite() )
			update_blog_option( get_current_blog_id(), 'stella-options', $options );
		else 
			update_option( 'stella-options', $options );

		return true;
	}
}
if( ! function_exists( 'stella_get_langs_codes') ){
	function stella_get_langs_codes(){
		if( file_exists( dirname(__FILE__).'/lang-codes-list.txt') ){
			$lang_codes = file( dirname(__FILE__).'/lang-codes-list.txt' );
		}
		// explode lines to lang prefix(code) and lang name
		$exploded_lang_codes = array();
		foreach( $lang_codes as $key => $line ){
			$lang = stella_explode_lang_line( str_replace( '/\n', '', $line ) );
			if( false != $lang )
				$exploded_lang_codes[ strtolower( $lang['prefix'] ) ] = trim($lang['name']);
		}
		return apply_filters( 'stella-lang-codes', $exploded_lang_codes );
	}
}
if( ! function_exists( 'stella_explode_lang_line') ){
	function stella_explode_lang_line( $s ){
		$exploded = explode( '/', $s );
		if( 2 == count( $exploded ) ){
			return array( 'name'=>trim( $exploded['0'] ), 'prefix'=>trim( $exploded['1'] ) );
		}
		return false; 
	}
}
if ( ! function_exists( 'stella_translate_custom_field') ) {
	function stella_translate_custom_field( $id, $field_name, $title, $post_type, $context ) {
		do_action('stella_translate_custom_field', $id, $field_name, $title, $post_type, $context);
	}
}

if ( ! function_exists( 'stella_translate_custom_thumbnail') ) {
	function stella_translate_custom_thumbnail( $label, $id, $post_type ) {
		do_action( 'stella_translate_custom_thumbnail', $label, $id, $post_type );
	}
}

/* Deprecated, since 1.3.48 - use stella_translate_filter instead */
if ( ! function_exists('stella_translate_string') ){
	function stella_translate_string( $filter_name, $original_string, $translations_array ){
		do_action( 'stella_translate_string', $filter_name, $original_string, $translations_array );
	}
}

if ( ! function_exists('stella_translate_filter') ){
	function stella_translate_filter( $filter_name, $translations_array ){
		do_action( 'stella_translate_filter', $filter_name, $translations_array );
	}
}

?>
