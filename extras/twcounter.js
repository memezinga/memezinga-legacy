
/**
* Some code to count the number of a hashtag in a Twitter page.
* You can change the hashtag value to look for your favourite one ;)
*/

/**
* Here we declarate some variables:
*/
var cosas= document.getElementsByClassName('twitter-hashtag');
var hashtag = '#felizLunes'
var listaHashtag = [];
var lista = []
var total = '';
/**
* Now we make a function to look for our hashtag in the 'array' cosas,
* is our hashtag counter:
*/

function cuentaHastag(){

    for (var i = 0; i < cosas.length; i++) {
        listaHashtag[i] = cosas[i].lastChild.innerText;
        listaHashtag[i] = listaHashtag[i].toLowerCase();

        if (listaHashtag[i] === 'felizlunes') {
            lista.push(listaHashtag[i]);
        };
    } return lista;
};
/** Time to make a function that will make automathic scroll, yes we are lazy... XD:
*/

function pageScroll() {

    window.scrollBy(0,50);
    setTimeout('pageScroll()',1000);
    setTimeout('cuentaHastag()',1500);
    total = lista.length;
};

/**
Just we call to the scroll function and this one will call to the hashtag counter.
You can see the lista.length to know how many hashtags are in the page.
Hope you like it!!
And yes... the console.log() don't run...
*/
pageScroll();
