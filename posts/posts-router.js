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
                error: "The post information could not be retrieved.",
            });
        });
});

router.get('/:id/comments', (req, res) => {

    const postId = req.params.id


    Db.findPostComments(postId)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
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

// router.put('/:id', (req, res) => {
//     const changes = req.body;
//     db.update(req.params.id, changes)
//         .then(hub => {
//             if (hub) {
//                 res.status(200).json(hub);
//             } else {
//                 res.status(404).json({ message: 'The hub could not be found' });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: 'Error updating the hub',
//             });
//         });
// });

module.exports = router; 