/*global renderEJS*/
/*global ajaxJson*/

function TemplatesgalleryCtr(){
    ajaxJson("https://api.imgflip.com/get_memes",function(data){
        renderEJS('create_gallery', data.data, 'view')
    })

}