var cosas= document.getElementsByClassName('twitter-hashtag');
var hashtag = "memezinga"
var lista = []
var contador= []
var total = 0;
for (var i = 0; i < cosas.length; i++) {
    lista.push(cosas[i].lastChild.innerText)
}
   

for (var i = 0; i < lista.length; i++) {
    
    if(lista[i].toLowerCase() === hashtag){
        total ++
    }
}