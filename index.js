const express = require('express');

const db = require('./data/db.js');

const server = express();

const postsRouter = require('./posts/posts-router.js')



server.use(express.json());


server.use('/api/posts', postsRouter)


server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Comments API</h2>
    <p>Welcome to the Lambda Comments API</p>
  `);
});



server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
