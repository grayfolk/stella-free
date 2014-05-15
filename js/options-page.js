/*
 * Usage: Everywhere
 */
var stellaOptionsPage = {};

stellaOptionsPage.update_selects = function(){
    jQuery('.select select').each(function(){
        jQuery(this).parent().next().text(jQuery(this).val());
    });
}

stellaOptionsPage.add_host_handler = function() {
    var select = jQuery("select[name='default-lang']").parent().clone();

    select.change( function(e) {
        stellaOptionsPage.update_selects();
    });

    jQuery(select).find('select').attr("name","lang[]");
    var hidden = false;
    if( ! jQuery('#use-hosts').length )
        hidden = " hidden";
    else
        hidden = ( jQuery('#use-hosts').is(':checked') ) ? "" :  " hidden";
    jQuery(this).after('<div class="lang-wrapper"><input class="host-options'+ hidden+'" type="text" name="host[]" value="" placeholder="' + options_page_vars['host_placeholder'] + '"/><input class="button del-button" type="button" name="del-host" value="' +
        options_page_vars['btn_delete'] + '"/></div>');
    jQuery(this).next().css("display","none");
    jQuery(this).next().prepend(select);
    jQuery(this).next().show('fast');
    jQuery(select).after('<div class="select-value"></div>');
    jQuery(select).find('select').click( function() {jQuery(this).parent().next().text(jQuery(this).val());});
    jQuery(select).find('select').keyup( function(e) {
        if(e.keyCode == 13){
            jQuery(this).parent().next().text(jQuery(this).val());
            stellaOptionsPage.update_selects();
        }
    });
    stellaOptionsPage.update_selects();
}

jQuery(document).ready(function($) {

    function init_switchers(){
        $('.switchbox').each(function(){
            if($(this).is(':checked')){
                $(this).prev().css("left","-=44px");
                $(this).next().css("backgroundColor", "rgb(162,198,109)");
                $(this).next().find('.rail').css("left","-=35px");
            }
        });
    }
    function init_selects(){
        $('.select').each(function(index, element){
            $(element).after('<div class="select-value"></div>');
        });
    }
    
	if( $('#language-options').length ){
        
		
		console.log("options page");
		init_switchers(); 
		init_selects();

		stellaOptionsPage.update_selects();

		// select handlers
		$('.select select').click( function() {
			$(this).parent().next().text($(this).val());
		});
		$('.select select').keyup( function(e) {
			if(e.keyCode == 13){
				$(this).parent().next().text($(this).val());
				stellaOptionsPage.update_selects();
			}    
		});
		$('.select select').change( function(e) {
			stellaOptionsPage.update_selects();
		});

		// add new host
		$('#add-host').bind( 'click.add_host', stellaOptionsPage.add_host_handler );

		// submit button
		$('#submit-options').click( function() {
			if($('#use-hosts').is(':checked')) return confirm(options_page_vars['confirm_msg']);
		});

		// switchboxes handler
		$('.switchbox').click( function(e) {
			if($(this).is(':checked')){
				$(this).prev().animate({left:'-=44px'},200,"swing");
				$(this).next().animate({backgroundColor: 'rgb(162,198,109)'},200,"swing");
				$(this).next().find('.rail').animate({left:'-=35px'},200,"swing");

			}else{
				$(this).prev().animate({left:'+=44px'},200,"swing");
				$(this).next().animate({backgroundColor: 'rgb(218,117,101)'},200,"swing");
				$(this).next().find('.rail').animate({left:'+=35px'},200,"swing");
			} 
		});

		// delete button
		$('.lang-wrapper .del-button').live('click',function(){
			var that = this;
			$(that).parent().hide('fast',function(){ $(that).parent().detach(); });
		});

		// don't show hosts if use_hosts not checked
		$('#use-hosts').click( function(e) {
			if($(this).is(':checked')){			
				$('.host-options').css('display','inline-block');
				$('.host-options').animate({width:'250px',opacity:'100'},300,"swing");		 
			}else{
				$('.host-options').animate({width:'0px',opacity:'0'},300,"swing",function(){
					$('.host-options').css('display','none');
				});
			}
		});
        // don't show menus if switcher not checked
        $('#switcher-in-menu').click( function( e ){
            if($(this).is(':checked')){
                $('.registered-nav-menus').show(300);
            }else{
                $('.registered-nav-menus').hide(300);
            }
        });
	}
});