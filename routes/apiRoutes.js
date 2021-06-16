
// api routes are for us to link our routes to our data, which can be held in different formats.
const Middle = require('../db/middleware')// we are using the db.json file to hold our note data that our api route can retrieve via the middleware.js class.

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

  router.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id

    Middle.deleteNote(deleteId)
    res.json("true")
  })
}


  
