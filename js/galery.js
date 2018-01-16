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
    if(results.length === 0){
        setTimeout(function(){
            alert("No se encontró el resultado.");
            document.getElementById("backLoader").style.display="none";
        },1000);
    }else{
        document.getElementById("backLoader").style.display="block";
        results.forEach(function(element, i){
            setTimeout(function() {
                console.log(element);
                html = '<div class="containerImg"><a href="/meme-generator.html?id='+ element.id + '"><img src="' + element.url + '"><h4>' + element.name + '</h4></a></div>';
                document.querySelector("#content").innerHTML += html;
                if(i>=results.length-1){
                    document.getElementById("backLoader").style.display="none";
                }
            }, i * 50);
        });
    }
}