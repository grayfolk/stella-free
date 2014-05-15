/*
 * Usage: Everywhere
 */
var Stella_Bloginfo = {};

jQuery(document).ready(function($) {
	if( $('#blogname').length )
	{
		if( bloginfo_langs != null ) Stella_Bloginfo.vars = $.parseJSON(bloginfo_langs);
		
		$('form table.form-table').before('<div id="bloginfo-tabs"></div>');
		$('#bloginfo-tabs').prepend('<div class="tabs-nav"><ul></ul></div>');

		for(i = 0; i < Stella_Bloginfo.vars['langs'].length;i++){
			// tab navigation elements 
			if( i == 0 ) $('#bloginfo-tabs .tabs-nav ul').append('<li><a href="#bloginfo-tab-'+ Stella_Bloginfo.vars['langs'][i][0]+'">' + Stella_Bloginfo.vars['langs'][i][1] + '<span class="default-label"> ( ' + Stella_Bloginfo.vars['default_str'] + ' )</span></a></li>');
			else $('#bloginfo-tabs .tabs-nav ul').append('<li><a href="#bloginfo-tab-'+ Stella_Bloginfo.vars['langs'][i][0]+'">' + Stella_Bloginfo.vars['langs'][i][1] + '</a></li>');
			// tab elements
			$('#bloginfo-tabs').append('<div id="bloginfo-tab-' + Stella_Bloginfo.vars['langs'][i][0] + '"><table class="form-table"></table></div>');
			if( i == 0) {
				Stella_Bloginfo.blogname = $('#blogname').parent().parent().detach();
				Stella_Bloginfo.blogdesc = $('#blogdescription').parent().parent().detach();
				$('#bloginfo-tab-' + Stella_Bloginfo.vars['langs'][i][0] + ' table').append(Stella_Bloginfo.blogname);
				$('#bloginfo-tab-' + Stella_Bloginfo.vars['langs'][i][0] + ' table').append(Stella_Bloginfo.blogdesc);
			}else{
				Stella_Bloginfo.blogname = $('#blogname-' + Stella_Bloginfo.vars['langs'][i][0] ).parent().parent().detach();
				Stella_Bloginfo.blogdesc = $('#blogdescription-' + Stella_Bloginfo.vars['langs'][i][0] ).parent().parent().detach();
				$('#bloginfo-tab-' + Stella_Bloginfo.vars['langs'][i][0] + ' table').append(Stella_Bloginfo.blogname);
				$('#bloginfo-tab-' + Stella_Bloginfo.vars['langs'][i][0] + ' table').append(Stella_Bloginfo.blogdesc);
			}
		}
		$('#bloginfo-tabs').append('<div class="tabs-separator"></div>');
		$('#bloginfo-tabs').tabs();
	}
});
