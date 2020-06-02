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

// router.get('/:id', (req, res) => {
//     db.findById(req.params.id)
//         .then(hub => {
//             if (hub) {
//                 res.status(200).json(hub);
//             } else {
//                 res.status(404).json({ message: 'Hub not found' });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: 'Error retrieving the hub',
//             });
//         });
// });

router.post('/', (req, res) => {
    const newPost = req.body;

    Db.insert(req.body)
    if (!newPost.title || !newPost.contents) {

        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    } else {

        try {
            users.push(newPost);

            res.status(201).json(posts);
        } catch{

            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    }
})
        // .then(post => {
        //     res.status(201).json(post);
        // })
        // .catch(error => {
        //     // log error to database
        //     console.log(error);
        //     res.status(400).json({
        //         errorMessage: "Please provide title and contents for the post.",
        //     });
        // });

});


// router.delete('/:id', (req, res) => {
//     db.remove(req.params.id)
//         .then(count => {
//             if (count > 0) {
//                 res.status(200).json({ message: 'The hub has been nuked' });
//             } else {
//                 res.status(404).json({ message: 'The hub could not be found' });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: 'Error removing the hub',
//             });
//         });
// });

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