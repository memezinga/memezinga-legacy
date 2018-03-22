/*global renderEJS*/
/*global ajaxJson*/
/*global router*/

function TemplatesgalleryCtr(){
    ajaxJson("https://us-central1-memezinga.cloudfunctions.net/api",function(data){
        renderEJS ({
            templateName: "create_gallery",
            data: data.data, 
            id: "view",
            cb: function(){
                document.getElementById("content").addEventListener("click", function(event){
                    var memeId = event.target.getAttribute("data-id-img")
                    router.navigate("/create/"+memeId);
                })
            }
        })
    })
}