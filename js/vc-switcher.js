/*
 * Usage: Everywhere
 */
jQuery(document).ready(function($) {
    if( window.vc && window.vc.storage ){
        var storage = window.vc.storage;

        // replace original getContent function by the same but language specific
        storage.getContent = function(){

            var element = 'content';
            if( storage.stellaLangCode ){
                element = 'tinymce'+storage.stellaLangCode;
            }

            // do default actions
            if (_.isObject(window.tinymce) && tinymce.editors.content) {
                tinymce.editors.content.save();
            }
            return window.vc_wpnop($('#' + element).val());


        }

        // replace original setContent function by the same but language specific
        storage.setContent = function( content ){

            var element = "content";
            if( storage.stellaLangCode ){
                element = 'tinymce'+storage.stellaLangCode;
            }

            // do default actions
            var tiny = _.isObject(window.tinymce) && tinymce.editors.content && !_.isUndefined(window.switchEditors),
                editor_hidden =  tiny && window.tinyMCE.get(element) && window.tinyMCE.get(element).isHidden();
            if (tiny) {
                window.switchEditors.go(element, 'html');
            }
            $('#' + element).val(content);
            if(tiny && !editor_hidden) {
                window.switchEditors.go(element, 'tmce');
            }
        }

        $(".tabs-nav .ui-tabs-anchor").bind('click', function( e ){
            // check if visual composer mode is turned on
            if(  window.vc.app.status != 'closed' ){
                // get href from element user is clicked
                var href = $(e.target).attr('href');
                // if user click on span inside <a>
                if( !href ) href = $(e.target).parent().attr('href');
                // set language code
                if( "#default-lang-editor" == href ){
                    storage.stellaLangCode = false;
                }else{
                    var lang = href.substring( href.length - 2 );
                    storage.stellaLangCode = lang;
                }
                // update model from actual tab
                storage.getContent();
                // update view (html)
                window.vc.app.show();
            }
        });
    }
});
