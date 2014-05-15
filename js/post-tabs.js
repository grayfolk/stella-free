/*
 * Usage: Everywhere
 */

var Stella_Post_Tabs = {};

jQuery(document).ready(function($) {
		if( $('#poststuff').length ){

			if( post_vars != null ){
				Stella_Post_Tabs.post_vars = $.parseJSON(post_vars);
			}
			// hide screen options checkboxeses

			Stella_Post_Tabs.hide_checkboxes( Stella_Post_Tabs.post_vars['post_type'] +'-postimagediv');
			Stella_Post_Tabs.hide_checkboxes('excerpt');
			Stella_Post_Tabs.hide_checkboxes('post-in');
			
			Stella_Post_Tabs.id_prefix = 'post-in-';

			// move elements inside one div
			$('#post-body-content').prepend('<div id="post-tabs"><div id="default-lang-editor"></div></div>');
			$('#titlediv').detach().appendTo($('#default-lang-editor'));
			$('#postdivrich').detach().appendTo($('#default-lang-editor'));
			$('#postexcerpt').detach().appendTo($('#default-lang-editor'));
			// finding all elemets with id = post-in-"lang"
			$('div#poststuff div').each(function(indx, element){
				if(element.id.substring(0,Stella_Post_Tabs.id_prefix.length)==Stella_Post_Tabs.id_prefix) {
					$(element).detach().appendTo($('#post-tabs'));		

					// clean metaboxes
					$(element).find('.handlediv').detach();
					$(element).find('.hndle').detach();
					element.className = "";
				}
			});
			// excerpts
			for(i = 1; i < Stella_Post_Tabs.post_vars['langs'].length; i++){
				$('#excerpt-'+Stella_Post_Tabs.post_vars['langs'][i][0]).detach().appendTo($('#post-in-'+Stella_Post_Tabs.post_vars['langs'][i][0]));
			}
			// add navigation
			Stella_Post_Tabs.nav_html = '<div class="tabs-nav"><ul><li><a href="#default-lang-editor">' + Stella_Post_Tabs.post_vars['langs'][0][1] + '<span class="default-label"> ( ' + Stella_Post_Tabs.post_vars['default_str'] + ' )</span></a></li>';
			for(i = 1; i < Stella_Post_Tabs.post_vars['langs'].length; i++){
				var id = Stella_Post_Tabs.id_prefix + Stella_Post_Tabs.post_vars['langs'][i][0];
                		Stella_Post_Tabs.nav_html+= '<li><a href="#' + id + '">' + Stella_Post_Tabs.post_vars['langs'][i][1] + '</a></li>';
                		// if element with id is not exists, create it
                		if( $('#'+id).length == 0 ){
                    			$("<div id='" + id + "'></div>").appendTo( $('div#poststuff div') );
                		}
			}

			Stella_Post_Tabs.nav_html += '</ul></div>';
			$('#default-lang-editor').before(Stella_Post_Tabs.nav_html);
			
			// turning tabs on
			$('#post-tabs').tabs();

			// hide checkboxes
			$('#postexcerpt-hide').click( function(e){
				Stella_Post_Tabs.update_from_checkboxes('excerpt','postexcerpt');
			});
			$('#postimagediv-hide').click( function(e){
				Stella_Post_Tabs.update_from_checkboxes( Stella_Post_Tabs.post_vars['post_type'] +'-postimagediv', 'postimagediv' );
			});
			Stella_Post_Tabs.update_from_checkboxes( 'excerpt','postexcerpt' );
			Stella_Post_Tabs.update_from_checkboxes( Stella_Post_Tabs.post_vars['post_type'] +'-postimagediv', 'postimagediv' );
		}
});

Stella_Post_Tabs.update_from_checkboxes = function( checkbox_id_prefix, metabox_id_prefix ){
	if(jQuery( '#' + metabox_id_prefix + '-hide').is(':checked')){
		for(i = 1; i < Stella_Post_Tabs.post_vars['langs'].length; i++){
			jQuery( '#' + checkbox_id_prefix + '-' + Stella_Post_Tabs.post_vars['langs'][i][0]).css('display','block');
		}
	}else{
		for(i = 1; i < Stella_Post_Tabs.post_vars['langs'].length; i++){
			jQuery( '#' + checkbox_id_prefix + '-' +Stella_Post_Tabs.post_vars['langs'][i][0]).css('display','none');
		}
	}
}

Stella_Post_Tabs.hide_checkboxes = function( checkbox_id_prefix ){
	for(i = 1; i < Stella_Post_Tabs.post_vars['langs'].length; i++){
		jQuery( 'label[for=' + checkbox_id_prefix + '-' + Stella_Post_Tabs.post_vars['langs'][i][0] + '-hide]' ).css('display','none');
	}
}
