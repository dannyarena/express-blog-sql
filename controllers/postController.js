const { posts } = require('../data/posts');

// index con filtro tag
function index(req, res) {
    let filteredPosts = posts;

    if(req.query.tag) {
        filteredPosts = posts.filter(post =>
            post.tags.includes(req.query.tag));
    }
    res.json(filteredPosts);
}

// show
function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }
}

// store
function store(req, res) {
    const newId = posts[posts.length - 1].id + 1;
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
}

//update
function update(req, res) {
    const id = parseInt(req.params.id);
    // Cerchiamo il post con l'id specificato
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }

    // Aggiorna i campi del post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(posts);
    res.json(post);
}

// destroy con logica di eliminazione
function destroy(req, res) {
    const id = parseInt(req.params.id);
   const post = posts.find(p => p.id === id);

   if(!post) {
    return res.status(404).json({
        error: 'Not Found',
        message: 'Post non trovato'
    
    });
   }

// Rimuove il post dall’array
   posts.splice(posts.indexOf(post), 1);
// Mostra l’array aggiornato nel terminale
   console.log(posts);
// Risponde con 204 No Content
   res.sendStatus(204);
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};