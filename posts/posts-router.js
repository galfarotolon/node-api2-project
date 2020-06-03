const express = require('express')
const router = express.Router();
const Db = require('../data/db.js');


router.get('/', (req, res) => {
    Db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id


    Db.findById(id)
        .then(post => {
            if (post.length == 0) {

                res.status(404).json({ message: "The post with the specified ID does not exist." });

            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

router.get('/:id/comments', (req, res) => {

    const postId = req.params.id


    Db.findPostComments(postId)
        .then(comments => {
            if (comments.length == 0) {

                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            else {
                res.status(200).json(comments);
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            });
        });
});

router.post('/', (req, res) => {
    const newPost = req.body;


    if (!newPost.title || !newPost.contents) {

        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    } else {

        try {
            Db.insert(newPost)
                .then(post => {
                    res.status(201).json(post);
                })

        } catch{

            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    }
})



router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = { ...req.body, post_id: id };

    Db.findById(id)
        .then(post => {
            if (post.length) {
                if (comment.text) {
                    Db.insertComment(comment)
                        .then(newComment => {
                            res.status(201).json(newComment);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: "There was an error while saving to the database"
                            });
                        });
                } else {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." });
                }
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while saving the comment to the database."
            });
        });
})



router.delete('/:id', (req, res) => {
    Db.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been deleted.' });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The post could not be removed",
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Db.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The post information could not be modified.",
            });
        });
});

module.exports = router; 