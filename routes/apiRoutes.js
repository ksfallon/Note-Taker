//const router = require('express').Router()
// const app = express()
// api routes are for us to link our routes to our data, which can be held in different formats.
// we are using the db.json file to hold our note data that our api route can retrieve.
const Middle = require('../db/middleware')
const noteFile = require('../db/db.json')

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
    noteFile.splice({id: req.params.id}, 1);
    console.log("ds.json", noteFile)
    Middle.writeFile(noteFile)
    res.end()
  })
}


  
