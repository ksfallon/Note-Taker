const path = require('path')

module.exports = (app) => {
    // => HTML GET Requests
 
    // This is how the user visits specific pages, first we put the notes page
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // last we put the default home page which is index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  };