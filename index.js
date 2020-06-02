const express = require('express');

const db = require('./data/db.js');

const server = express();

//const hubsRouter = require('./hubs/hubs-router.js')

//const lessonsRouter = require('./lessons/lessons-router.js')

server.use(express.json());


// server.use('/api/hubs', hubsRouter)
// server.use('/api/lessons', lessonsRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Comments API</h2>
    <p>Welcome to the Lambda Comments API</p>
  `);
});



// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
