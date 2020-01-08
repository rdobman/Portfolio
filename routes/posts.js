const express = require('express')
const router = express.Router()
const Post = require('../models/post')


// All Posts Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const posts = await Post.find(searchOptions)
        res.render('posts/index',  { 
            posts: posts, 
            searchOptions: req.query 
        })
    } catch (e) {
        res.redirect('/')
    }    
})

// New Posts Route
router.get('/new', (req, res) => {
    res.render('posts/new', { post: new Post() })
})

// Create Post Route
router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name
    })
    try {
        const newPost = await post.save()
        // res.redirect('posts/${newPost.id}')
        res.redirect('posts')
    } catch (e) {
        res.render('posts/new', {
            post: post,
            errorMessage: 'Error creating post'
        })
    }
})

module.exports = router