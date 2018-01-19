(function(){
    function pintar(datos){
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
                    html = '<div class="containerImg"><a href="/meme-generator.html?id='+ element.id + '"><img src="' + element.url + '"><h4>' + element.name + '</h4></a></div>';
                    document.querySelector("#content").innerHTML += html;
                    if(i>=results.length-1){
                        document.getElementById("backLoader").style.display="none";
                    }
                }, i * 50);
            });
        }
    }
    
    function peticionAjax(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                var datos =  JSON.parse(xmlHttp.responseText);
                sessionStorage.setItem('memes', JSON.stringify(datos));
                callback(datos);
            } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
                console.error("ERROR! 404");
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    
    if(sessionStorage.getItem('memes')){
        pintar(JSON.parse(sessionStorage.getItem('memes')));   
    }else{
        peticionAjax("https://api.imgflip.com/get_memes",pintar);
    }
}());

    