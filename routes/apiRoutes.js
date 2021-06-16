//const router = require('express').Router()
// const app = express()
// api routes are for us to link our routes to our data, which can be held in different formats.
// we are using the db.json file to hold our note data that our api route can retrieve.
const Middle = require('../db/middleware')

// ROUTING  now we use GET requests with our API - similar to the GET requests for our HTML Routes
module.exports = (router) => {

  router.get('/api/notes', async (req, res) => {
    const notes = await Middle.readFile()
    res.json(notes)
  })

  router.post('/api/notes', (req, res) => {
    const note = req.body
    console.log('incoming note!!!! ', note)
    
    Middle.writeFile(note)
    res.end()

  })

  router.delete('/api/notes', (req, res) => {
    // middle.
  })
}
  // return all saved notes as JSON with GET

//   app.post('/api/notes', (req, res) => {
// //receive a new note to save on the request body
// // add it to the db.json file
// //then return the new note to the client.

// // UNIQUE ID - create with uniqid npm should work - unique ID is only shown in the db.json ?

//       dbNotes.push(req.body);

//   });

  
