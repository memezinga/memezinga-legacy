/*global renderEJS*/
/*global ajaxJson*/

var configCanvas = {
    canvasTextTopFontSize:50,
    canvasTextBottomFontSize:50,
    paddingPreviewText:10,
}

/**
 * @description: if user change text color on input we get it and we give the color choosed to text.
 * @param {object} input - input type color where we get the color.
 * @param {object} textTop - text placed on top of the preview.
 * @param {object} textBottom - text placed on bottom of the preview.
 */
function previewTextColorEvent (input, textTop, textBottom) {
    input.addEventListener("change", function() {
        textTop.style.color = this.value;
        textBottom.style.color = this.value;
    });
}


/**
 * @description: Valid that the text does not exceed the width of the 
 * image and in this case modify the font size of the east
 * @param {object} input - input type text where users write their own text.
 * @param {object} span - span where text is shown in the preview.
 * @param {object} event - event keyup.
 */
function validateWidthText (obj) {
    var input = obj.input,
        span = obj.span,
        event = obj.event,
        position = obj.position
        canvasTextFontSize = position === "top" ? configCanvas.canvasTextTopFontSize : configCanvas.canvasTextBottomFontSize
        
        if(position === "top") console.log("Solo yo soy top22...")
        //configCanvas.canvasTextTopFontSize
    
    var imageWidth = document.querySelector('.preview-image').clientWidth,
        previewTextWidth = span.offsetWidth;
        
    while (imageWidth < previewTextWidth) {
        canvasTextFontSize--;
        span.style.fontSize = canvasTextFontSize.toString() + 'px';
        previewTextWidth = span.offsetWidth;
    }
        
    if(event.keyCode === 8 || event.keyCode === 46){ //If Backspace codeKey: 8, Backspace codeKey: 46
        console.log("previewTextWidth+configCanvas.paddingPreviewText:", previewTextWidth+configCanvas.paddingPreviewText)
        console.log("imageWidth:", imageWidth)
        console.log("imageWidth > (previewTextWidth+configCanvas.paddingPreviewText)???", imageWidth > (previewTextWidth+configCanvas.paddingPreviewText))
        console.log("canvasTextFontSize:", canvasTextFontSize)
        console.log("canvasTextFontSize < 50???", canvasTextFontSize < 50)
        
        while (imageWidth > (previewTextWidth+configCanvas.paddingPreviewText) && canvasTextFontSize < 50){
            canvasTextFontSize++;
            span.style.fontSize = canvasTextFontSize.toString() + 'px';
            previewTextWidth = span.offsetWidth;
        }
    }

}

/**
 * @description: text written on input is shown in the preview.
 * @param {object} input - input type text where users write their own text.
 * @param {object} span - span where text is shown in the preview.
 */
function previewTextEvent (input, span, position) {
    input.addEventListener("keyup", function(e) {
        span.innerText = this.value.toUpperCase();
        if(position === "top") console.log("Solo yo soy top...")
        validateWidthText({
            input: input, 
            span: span,
            event: e,
            position: position
        });
    });
}


function selectorsContent () {
    return {
        img: document.querySelector('.preview-image'),
        topPreviewTextInput: document.querySelector('.preview-text-top-input'),
        topPreviewText: document.querySelector('.preview-text-top'),
        bottomPreviewTextInput: document.querySelector('.preview-text-bottom-input'),
        bottomPreviewText: document.querySelector('.preview-text-bottom'),
        previewTextColorInput: document.querySelector('.preview-text-color-input')
    }
}



function createMemeCtr(params){
    console.log("Estas en Create_meme.js")

        ajaxJson("https://us-central1-memezinga.cloudfunctions.net/api",function(data){
        
        // --001 Filtrar la lista... (Esto luego será /api/meme/:id)
        var memedata;
        for (var i = 0; i < data.data.memes.length; i++) {
            if(data.data.memes[i].id === params.idMeme) {
                memedata = data.data.memes[i];
            }
        }
        
        // --001 FIN FILTRO....
        console.log("memedata:", memedata)
        renderEJS ({
            templateName: memedata ? "create_meme" : "404",
            data: {meme: memedata}, 
            id: "view",
            cb: function(){
                var selectors = selectorsContent()
                previewTextEvent (selectors.topPreviewTextInput, selectors.topPreviewText, 'top');
                previewTextEvent (selectors.bottomPreviewTextInput, selectors.bottomPreviewText, 'bottom');
                previewTextColorEvent (selectors.previewTextColorInput, selectors.topPreviewText, selectors.bottomPreviewText);
            }
        })
    })
}