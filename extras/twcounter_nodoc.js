


var cosas= document.getElementsByClassName('twitter-hashtag');

var hashtag = "memezinga";

var listaHashtag = [];

var lista = [];

var total = '';
var posicion = 0;


function cuentaHashtag(){
    lista = [];
    for (var i = 0; i < cosas.length; i++) {
        listaHashtag[i] = cosas[i].lastChild.innerText;
        listaHashtag[i] = listaHashtag[i].toLowerCase();
        if (listaHashtag[i] === hashtag) {
            lista.push(listaHashtag[i]);
        };
    }
    total = lista.length-1;

    return total;
};

function pageScroll() {
    window.scrollBy(0,100);
    

    if (posicion < scrollY) {
        setTimeout('pageScroll()',1000);
        posicion = scrollY;
    } 
    else {
        cuentaHashtag()
        document.querySelector("body").innerHTML='<div><h1>El Hashtag '+ hashtag+ ' se ha twitteado '+cuentaHashtag()+' veces</h1></div>'    }
    
};

pageScroll()

