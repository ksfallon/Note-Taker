// api routes are for us to link our routes to our data, which can be held in different formats.
// we are using the db.json file to hold our note data that our api route can retrieve.
const middle = require('../db/middleware')

// ROUTING  now we use GET requests with our API - similar to the GET requests for our HTML Routes
module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    middle.
  })
  // return all saved notes as JSON with GET

  app.post('/api/notes', (req, res) => {
//receive a new note to save on the request body
// add it to the db.json file
//then return the new note to the client.

// UNIQUE ID - create with uniqid npm should work - unique ID is only shown in the db.json ?
   
      dbNotes.push(req.body);

  });


//   app.post('/api/delete', (req, res) => {
 

//   });
// };