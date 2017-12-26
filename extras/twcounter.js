
/**
* Some code to count the number of a hashtag in a Twitter page.
* You can change the hashtag value to look for your favourite one ;)
*/

/**
* Here we declarate some variables:
*/
var cosas= document.getElementsByClassName('twitter-hashtag');
var listaHashtag = [];
var lista = [];
var total = '';
var posicion = 0;
/**
* Now we make a function to look for our hashtag in the 'array' cosas,
* is our hashtag counter:
*/

function cuentaHashtag(){
    // Empty the lista array and execute again the hashtag counter:
    lista = [];
    for (var i = 0; i < cosas.length; i++) {
        listaHashtag[i] = cosas[i].lastChild.innerText;
        listaHashtag[i] = listaHashtag[i].toLowerCase();
        // Here you can put your hashtag without the #
        if (listaHashtag[i] === 'memezinga') {
            lista.push(listaHashtag[i]);
        };
    }
    total = lista.length;

    return total;
};
/** Time to make a function that will make automathic scroll, yes we are lazy... XD:
*/
function pageScroll() {
    window.scrollBy(0,100);

    if (posicion < scrollY) {
        setTimeout('pageScroll()',1000);
        posicion = scrollY;
    } else {
        cuentaHashtag();
    }
    return lista;
};


setTimeout('pageScroll()',1000);



/**
Just we call to the scroll function and this one will call to the hashtag counter.
You can see the lista.length to know how many hashtags are in the page.
Hope you like it!!
And yes... the console.log() don't run...
*/
