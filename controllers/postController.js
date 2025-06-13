const db = require('../data/db');
const { posts } = require('../data/posts');

// index con filtro tag
function index(req, res) {
    const sql = 'SELECT * FROM posts';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query al database'});
        }

        res.json(results);
    })
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
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella cancellazione'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post non trovato'});
        }

        res.sendStatus(204);
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};