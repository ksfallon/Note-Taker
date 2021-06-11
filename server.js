// importing our npm express module here by creating a const express and requiring express
const express = require('express');
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes');
// we need to set the const app = to express() bc it tells node js that we are creating an "express" server
const app = express();

// we make our PORT const which either is on the available port or 8080 so we can deploy it to Heroku
//Heruko determines the port we run on that is why it has to be process.env.PORT
const PORT = process.env.PORT || 8080;

// here is out middleware for sending JSON (our data) and then parsing all that data.
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true })); //true is for the qs library(look that up)
app.use(express.json());


// Routes are all the different paths he server can go down, like a map, it can use to respond when users visit or request data from diff URLS
// Here we are requiring two routes - api and html - either go down some api paths or html paths here
// *Always do api route first, can hit a bug if its put second bc html can block the api routes
app.use('/api', apiRoutes); //api routes are for getting data, sending data, deleting data
app.use('/', htmlRoutes); //html routes are more the user they go to this page and get that specific html page


// here is where we start the server on the PORT, the listener 'calls' or 'listens for' the http
app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});