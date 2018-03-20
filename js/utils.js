function ajax(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            //var datos =  JSON.parse(xmlHttp.responseText);
            //sessionStorage.setItem('memes', JSON.stringify(datos));
            callback(xmlHttp.responseText);
        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function ajaxJson (url, cb) {
    ajax(url, function(data) {
        cb (JSON.parse(data))
    })
}

// getElementById wrapper
function getItemById (id) {
    return document.getElementById(id);
}


//function renderEJS (obj){
function renderEJS (obj){
    //¿es un objeto o 3 cosas?
    var templateName, data, id, cb;
    if(arguments.length !== 3 && typeof(arguments[0]) === "object") {
        templateName = obj.templateName;
        data = obj.data;
        id = obj.id;
        cb = obj.cb;
    } else {
        templateName = arguments[0];
        data = arguments[1];
        id = arguments[2];
    }
    // normalizo las 3 cosas...
    
    var templateUrl = `templates/${templateName}.ejs`
    ajax(templateUrl, (template) => {
        getItemById(id).innerHTML = ejs.render(template, {data});
        if(cb) {
            cb()
        }
    })
}