// importing our npm express module here by creating a const express and requiring express
const express = require('express');

// we need to set the const app = to express() bc it tells node js that we are creating an "express" server
const app = express();

// we make our PORT const which either is on the available port or 8080 so we can deploy it to Heroku
//Heruko determines the port we run on that is why it has to be process.env.PORT
const PORT = process.env.PORT || 8080;

// here is out middleware for sending JSON (our data) and then parsing all that data.
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true })); //true is for the qs library(look that up)
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// Routes are all the different paths you can go down
// Here we are requiring two routes - api and html - either go down some api paths or html paths here
// *Always do api route first, can hit a bug if its put second bc html can block the api routes
require('./routes/apiRoutes')(app); //api routes are for getting data, sending data, deleting data
require('./routes/htmlRoutes')(app);//html routes are more the user they go to this page and get that specific html page

// LISTENER
// The below code effectively "starts" our server

// here is where we start the server on the PORT, the listen 'calls' the http
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});