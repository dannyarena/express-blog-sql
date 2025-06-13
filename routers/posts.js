const postsController = require('../controllers/postController');
const express = require ('express');
const router = express.Router();
const { posts } = require('../data/posts');

// Rotte CRUD
router.get('/', postsController.index);
router.get('/:id', postsController.show);
router.post('/', postsController.store);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.destroy);

module.exports = router;
