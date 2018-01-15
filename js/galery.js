//  https://api.imgflip.com/
//  https://api.imgflip.com/get_memes

function peticionAjax(url, callback) {
    var xmlHttp = new XMLHttpRequest();
        
    xmlHttp.onreadystatechange = function() {
        /*if(!document.querySelector('.loading')){
            document.querySelector('.container').innerHTML += "<div class='loading'>"+"<img src='loader1.svg'/>"+"</div>"
        }*/

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var datos =  JSON.parse(xmlHttp.responseText);
            localStorage.setItem('memes', datos);
            callback(datos);
        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

(function(){
    
    peticionAjax("https://api.imgflip.com/get_memes",pintar)
}());

function pintar (datos){
    var results = datos.data.memes
    var html = '';
    /*if(results.length === 0){
        setTimeout(function(){
            alert("No se encontró el resultado.")
            document.querySelector('.loading').remove();
        },1000);
    }else{*/
    results.forEach(function(element, i){
        console.log(element)
        /*document.querySelector(".container").innerHTML += html;
        if(i>=results.length-1){
            setTimeout(function(){
                document.querySelector('.loading').remove();
            },1000);
        }*/
    });
    
}