const path = require('path')

module.exports = (router) => {
 
    // This is how the user visits specific pages, first we put the notes page
    router.get('/notes', (req, res) => {
      console.log('hit / notes html route!')
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // last we put the default home page which is index.html
   // router.get('*', (req, res) => {
   // res.sendFile(path.join(__dirname, '../public/index.html'));
   // });
  };