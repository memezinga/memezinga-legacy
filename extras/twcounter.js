

/**
 * @fileoverview Menú aprMenu, desplegable con efecto expansión suavizado

 *

 * @version    1.0– Code to copy and paste at navigator's console to count the hastag '#memezinga' in Twitter.

 *

 * @author                 Vicky y Elena<elena.mateos1@gmail.com>

 *

 * @description

 * This version was created to count just the '#memezinga' hastags. You can change the hastag to
      * count other kinds of hastags of course. Just copy and paste the code at the navigator's console
      * and them call to lista.length. This will return the number of hastags.
*/


/**
* @description Here we declarate some variables:
*/
/**
*@type {array}
*@description cosas: Make an Array with all the labels with 'twitter-hastag' in the page.
*/
var cosas= document.getElementsByClassName('twitter-hashtag');
/**
*@type {array}
*@description listaHashtag: Empty Array. Here we store ALL the hastags.
*/
var listaHashtag = [];
/**
*@type {array}
*@description lista: Empty Array. Here we store just the #memezinga.
*/
var lista = [];
/**
*@type {string}
*@description total: Empty string
*/
var total = '';
var posicion = 0;
/**
* @function cuentaHashtag
* @description Now we make a function to look for our hashtag in the 'array' cosas,
* is our hashtag counter:
* @return {number} the total of hashtags
*@example
*  function cuentaHashtag(){
*
*   // Empty the lista array and execute again the hashtag counter:
*   lista = [];
*   for (var i = 0; i < cosas.length; i++) {
*       listaHashtag[i] = cosas[i].lastChild.innerText;
*       listaHashtag[i] = listaHashtag[i].toLowerCase();
*
*       // Here you can put your hashtag without the #
*       if (listaHashtag[i] === 'memezinga') {
*           lista.push(listaHashtag[i]);
*        };
*   }
*   total = lista.length;
*   return total;
*  };
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
/**
* @function pageScroll
* @description Time to make a function that will make automathic scroll, yes we are lazy... XD:
* @return {array} The array 'Lista' with all the hastags
* @example
* function pageScroll() {
*    window.scrollBy(0,100);
*
*    if (posicion < scrollY) {
*        setTimeout('pageScroll()',1000);
*        posicion = scrollY;
*    } else {
*        cuentaHashtag();
*    }
*    return lista;
* };
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

/**
* @method setTimeout
* @param {function} pageScroll to make the automathic scroll
* @param {number} 1000 miliseconds to repeat the function pageScroll()
* @description Just we call to the scroll function and this one will call to the hashtag counter.
* You can see the lista.length to know how many hashtags are in the page.
* Hope you like it!!
* And yes... the console.log() don't run...
* @example
* setTimeout('pageScroll()',1000);
*/
setTimeout('pageScroll()',1000);

/**
Just we call to the scroll function and this one will call to the hashtag counter.
You can see the lista.length to know how many hashtags are in the page.
Hope you like it!!
And yes... the console.log() don't run...
*/
