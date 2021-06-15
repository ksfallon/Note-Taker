const path = require('path')
const router = require('express').Router

module.exports = (router) => {
    // => HTML GET Requests
 
    // This is how the user visits specific pages, first we put the notes page
    router.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // last we put the default home page which is index.html
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  };