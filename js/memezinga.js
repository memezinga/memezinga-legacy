//antes meme-generator.js

var app = {
    canvas:null,
    image:null,
    imagePreview:null,
    canvasTextTopFontSize:50,
    canvasTextBottomFontSize:50,
    paddingPreviewText:10,
    btnCreate: document.querySelector('.create'),
    tools:{
        /**
        * This method create a new image with texts, using the html5 canvas.
        * @param {htmlTag} image - The image to transform.
        * @param {htmlTag} imagePreview - The preview of the image to transform.
        * @param {string} textAbove - The text above of the image.
        * @param {string} textBelow - The text below of the image.
        * @param {object} properties - Set of properties for the texts and image.
        * @param {number} properties.textSize - The font size for both texts
        * @param {string} properties.textColor - The color (hex format) for both texts
        * @param {number} properties.textPadding - Padding top for the text above et padding bottom fot the text below
        * @param {string} properties.imageFormat - Format to image. ex. 'image/png'
        * @returns {string} Return a Base64 DataURI string of the new image
        */
        createImage: function (imagePreview, textAbove, textBelow, properties) {
            var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');

            imagePreview.width > 0 ? canvas.width = imagePreview.width : canvas.width = 300
            imagePreview.height > 0 ? canvas.height = imagePreview.height : canvas.height = 300

            context.drawImage(imagePreview, 0, 0, imagePreview.width, imagePreview.height);
            
            if (textAbove) {
                properties.textSize = app.canvasTextTopFontSize;
                app.tools.drawStroked(context, textAbove, canvas.width / 2, properties.textPadding, properties);
            }
            if (textBelow) {
                properties.textSize = app.canvasTextBottomFontSize;
                app.tools.drawStroked(context, textBelow, canvas.width / 2, canvas.height - properties.textSize - (properties.textPadding / 2), properties);
            }

            return canvas.toDataURL(properties.imageFormat);
        },

        create: function () {
            var image = document.querySelector('#image'),
                imagePreview = document.querySelector('.preview-image'),
                downloadLink = document.querySelector('#download'),
                textAbove = document.querySelector('.preview-text-top-input').value,
                textBelow = document.querySelector('.preview-text-bottom-input').value,
                colorText = document.querySelector('.preview-text-color-input').value,
                properties = {
                    textTopSize: app.canvasTextTopFontSize,
                    textSize: 50,
                    textColor: colorText,
                    textPadding: 20,
                    imageFormat: 'image/png'
                };

            var dataUrlImage = app.tools.createImage(imagePreview, textAbove.toUpperCase(), textBelow.toUpperCase(), properties);
            if(image) {
                image.src = dataUrlImage;
            } else {
                document.querySelector('.img-container').innerHTML = "";
                document.querySelector('.img-container').innerHTML = '<img id="image" src="' + dataUrlImage + '" />';
            }
            
            if(downloadLink) {
                downloadLink.download = dataUrlImage;
            } else {
                document.querySelector('.img-container').innerHTML += '<a id="download" download="meme.png" href="' + dataUrlImage + '" target="_blank">Descargar</a>';
            }
            
            
        },
        /**
         * @description: get every elements which take part in the preview of the meme and add them all actions.
         */
        previewImage: function() {
            var img = document.querySelector('.preview-image');
            var topPreviewTextInput = document.querySelector('.preview-text-top-input');
            var topPreviewText = document.querySelector('.preview-text-top');
            var bottomPreviewTextInput = document.querySelector('.preview-text-bottom-input');
            var bottomPreviewText = document.querySelector('.preview-text-bottom');
            var previewTextColorInput = document.querySelector('.preview-text-color-input');

            app.tools.previewTextEvent(topPreviewTextInput, topPreviewText, 'top');
            app.tools.previewTextEvent(bottomPreviewTextInput, bottomPreviewText, 'bottom');
            app.tools.previewTextColorEvent(previewTextColorInput, topPreviewText, bottomPreviewText);
        },
        /**
         * @description: text written on input is shown in the preview.
         * @param {object} input - input type text where users write their own text.
         * @param {object} span - span where text is shown in the preview.
         */
        previewTextEvent: function(input, span, type) {
            input.addEventListener("keyup", function(e) {
                span.innerText = this.value.toUpperCase();
                if(type === 'top'){
                    app.tools.validateWidthInputPreviewTopText(input, span, e);
                }else{
                    app.tools.validateWidthInputPreviewBottomText(input, span, e);
                }
            });
        },
        
        /**
         * @description: Valid that the text does not exceed the width of the 
         * image and in this case modify the font size of the east
         * @param {object} input - input type text where users write their own text.
         * @param {object} span - span where text is shown in the preview.
         * @param {object} event - event keyup.
         */
        validateWidthInputPreviewTopText:function (input, span, event) {
            var imageWidth = document.querySelector('.preview-image').clientWidth,
                previewTextWidth = span.offsetWidth;
                
            while (imageWidth < previewTextWidth) {
                app.canvasTextTopFontSize = app.canvasTextTopFontSize - 1;
                span.style.fontSize = app.canvasTextTopFontSize.toString() + 'px';
                previewTextWidth = span.offsetWidth;
            }
                
            if(event.keyCode === 8 || event.keyCode === 46){ //If Backspace codeKey: 8, Backspace codeKey: 46
                while (imageWidth > (previewTextWidth+app.paddingPreviewText) && app.canvasTextTopFontSize < 50){
                    app.canvasTextTopFontSize = app.canvasTextTopFontSize + 1;
                    span.style.fontSize = app.canvasTextTopFontSize.toString() + 'px';
                    previewTextWidth = span.offsetWidth;
                }
            }

        },
        
        validateWidthInputPreviewBottomText:function (input, span, event) {
            var imageWidth = document.querySelector('.preview-image').clientWidth,
                previewTextWidth = span.offsetWidth;
                
            while (imageWidth < previewTextWidth) {
                app.canvasTextBottomFontSize = app.canvasTextBottomFontSize - 1;
                span.style.fontSize = app.canvasTextBottomFontSize.toString() + 'px';
                previewTextWidth = span.offsetWidth;
            }
                
            if(event.keyCode === 8 || event.keyCode === 46){ //If Backspace codeKey: 8, Backspace codeKey: 46
                while (imageWidth > (previewTextWidth+app.paddingPreviewText) && app.canvasTextBottomFontSize < 50){
                    app.canvasTextBottomFontSize = app.canvasTextBottomFontSize + 1;
                    span.style.fontSize = app.canvasTextBottomFontSize.toString() + 'px';
                    previewTextWidth = span.offsetWidth;
                }
            }

        },
        /**
         * @description: if user change text color on input we get it and we give the color choosed to text.
         * @param {object} input - input type color where we get the color.
         * @param {object} textTop - text placed on top of the preview.
         * @param {object} textBottom - text placed on bottom of the preview.
         */
        previewTextColorEvent: function(input, textTop, textBottom) {
            input.addEventListener("change", function() {
                textTop.style.color = this.value;
                textBottom.style.color = this.value;
            });
        },
        /**
         * @description: here we apply styles over text for the final meme.
         * @param {object} ctx - context (canvas).
         * @param {string} text - text of the meme.
         * @param {int} x - horizontal text position.
         * @param {int} y - vertical text position.
         * @param {object} properties - properties for the texts.
         */
        drawStroked: function(ctx, text, x, y, properties) {
            ctx.font = properties.textSize +'px impact';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'hanging';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 8;
            ctx.lineJoin="miter";
            ctx.miterLimit=2;
            ctx.strokeText(text, x, y);
            ctx.fillStyle = properties.textColor;
            ctx.fillText(text, x, y);
        },
        
        /**
         * @description: get the id image selected from url.
         */
        getImageId:function () {
            var item = document.URL.match(/=(\d*)/g)
            return item ? item[0].replace('=','') : false;
        },
        
        /**
         * @description: insert the selected image in meme-generator page or component
         */
        insertSelectedImage:function () {
            var imagePreview = document.querySelector('.preview-image');
            var selectedImageId = app.tools.getImageId();
            if(sessionStorage.getItem('memes')){
                var memeList = JSON.parse(sessionStorage.getItem('memes')).data.memes;
                memeList.forEach(function (element) {
                    if (element.id === selectedImageId) {
                        app.tools.toDataURL(element.url,function (base64) {
                            imagePreview.src = base64;
                        })
                    }
                });                
            }

        },
        
        /**
         * @description: convert an image on base64 code. Temporal soluction to CORS error
         * @see {@link https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript}
         */
        toDataURL:function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        },
        
        resetValues:function () {
            document.querySelector('.preview-text-top-input').value = '';
            document.querySelector('.preview-text-top').innerText = '';
            document.querySelector('.preview-text-top').style.fontSize = '';
            document.querySelector('.preview-text-top').style.color = '';
            document.querySelector('.preview-text-bottom-input').value = '';
            document.querySelector('.preview-text-bottom').innerText = '';
            document.querySelector('.preview-text-bottom').style.fontSize = '';
            document.querySelector('.preview-text-bottom').style.color = '';
            document.querySelector('.preview-text-color-input').value = '#ffffff';
            app.canvasTextTopFontSize = 50;
            app.canvasTextBottomFontSize = 50;
        },
        

        /**
         * @description: Bucle for search image in JSON session Storage
         */
        memeSearch: function (datos, id){
            var results = datos.data.memes;
            var actualUrl = ""; 
        
            for (var i = 0; i< results.length; i++){
                if(results[i].id === id){
                    console.log(results[i].url);
                    actualUrl = results[i].url;
                    break;
                }
            }
            return actualUrl;
        }
        
        
        
    },
};

//antes galery.js

(function () {
    app.tools.previewImage();
    app.btnCreate.addEventListener('click',app.tools.create, true);
    app.tools.insertSelectedImage();



    
    function scrollUp(){
      if(window.scrollY != 0){
        setTimeout(function(){
          window.scrollTo(0, window.scrollY - 30);
          scrollUp();
        }, 5);
      }
    }
  
    document.getElementById("content").addEventListener("click", function(e){
        // Calc & Add height Header & Subheader
        var heightHeader = document.getElementById('header').offsetHeight;;
        var heightSubHeader = document.getElementById('subheader').offsetHeight;;
        var sumHeight = heightHeader + heightSubHeader;
        
        //Scrool Animation when you click in image
        scrollTo(document.body, sumHeight, 0);  

        
        if(e.target.classList.contains("hover-box") || e.target.classList.contains("hover-text")){

            var jsonMemes = JSON.parse(sessionStorage.getItem('memes'));
            var dataImgMemes = e.target.getAttribute("data-id-img");

            updateQueryStringParam("id", e.target.getAttribute("data-id-img"));
            document.querySelector(".preview-image-container > img").src = app.tools.memeSearch(jsonMemes, dataImgMemes);
            app.tools.resetValues();

        }
    })
    
    
})();

// @see: https://gist.github.com/excalq/2961415

function updateQueryStringParam(key, value) {
    var baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    var urlQueryString = document.location.search;
    var newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var keyRegex = new RegExp('([\?&])' + key + '[^&]*');
        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "$1" + newParam);
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
}




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
                    html = '<div class="containerImg"><div class="hover-box" data-id-img="'+element.id+'"><h4 class="hover-text" data-id-img="'+element.id+'">' + element.name + '</h4></div><img src="' + element.url + '"></div>';
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
        peticionAjax("https://us-central1-memezinga.cloudfunctions.net/api",pintar);
    }
}());
