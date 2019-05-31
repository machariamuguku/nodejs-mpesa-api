const express = require('express');
const app = express();

// connect to mongodb using a connector file
require('./mongoconnector');

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

/* 
Declare a port variable to either be read from 
an environment variable or declared explicitly 
*/
const port = process.env.PORT || 3000;

// use routes from an external file
const routes = require('./routes/routes');
app.use('/', routes)

// start the server
app.listen(port, console.log(`mpesa app listening on port ${port}`));