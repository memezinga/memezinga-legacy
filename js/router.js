// Esto es por ESLINT...
/*global Navigo*/
/*global router*/
/*global renderEJS*/
/*global TemplatesgalleryCtr*/


// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
    // 'view' is the id of the div element inside which we render the HTML
    'create': () => { TemplatesgalleryCtr() },
    'create/:idMeme': (params) => { renderEJS('create_meme', "Crear MEME - muestra nuestro meme con el formulario... ID:" + params.idMeme, 'view') },
    'profile': () => { renderEJS('profile_user', "Perfil - Información mía que solo veo como usuario logeando", 'view') },
    'profile/:idUser': (params) => { renderEJS('profile_user_public', "Perfil - Información pública de cualquier perfil ID:" + params.idUser, 'view') },
    'meme/:idMeme': (params) => { renderEJS('meme_details', "Meme en detalle - Sale la plantilla usada + el meme en si + el contexto ID:" + params.idMeme, 'view') }
})

// ROOT Route
router.on(() => { renderEJS('index', "Root - Galeria de memes generados por la gente", 'view')});

// set the 404 route
router.notFound((query) => { renderEJS('404', "Couldn\'t find the page you\'re looking for...", 'view')});

router.resolve();
