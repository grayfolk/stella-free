<?php
/*
 * Menu language switcher
 * Usage: Everywhere
 */
if( !class_exists('Primary_Menu_Language_Switcher') ){
    class Primary_Menu_Language_Switcher{

        function __construct(){
            $options = ( is_multisite() ) ? get_blog_option( get_current_blog_id(), 'stella-options' ) : get_option( 'stella-options' );

            if( $options['switcher_in_menu']['enabled'] && $options['switcher_in_menu']['menus'] ){
                foreach( $options['switcher_in_menu']['menus'] as $menu_slug ){

                    add_filter( 'wp_nav_menu_'.$menu_slug.'_items', array( $this, 'custom_menu_item' ), 10, 2 );

                }

            }

        }

        function custom_menu_item ( $items ) {
            $lang_list = stella_get_lang_list();
            $current_lang = stella_get_current_lang();
            foreach( $lang_list as $key => $value ){
                if( $key != $current_lang ){
                    $href = is_ssl() ? 'https://'.$value['href'] : 'http://'.$value['href'];
                    $title = strtoupper( $key );
                    $html = "<li><a href=$href>$title</a></li>";
                    $html = apply_filters( 'stella_menu_language_switcher_item_html', $html, array('title' => $value['title'], 'href' => $value['href'], 'code' => $key ) );
                    $items .= $html;
                }
            }
            return $items;

        }
    }
}
new Primary_Menu_Language_Switcher();
?>