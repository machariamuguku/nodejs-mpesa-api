const express = require('express');
const app = express();

// required for template engine
var exphbs  = require('express-handlebars');

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

// Define a templating engine to use for documentation
// will be served at root '/'
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// start the server
app.listen(port, console.log(`mpesa app listening on port ${port}`));