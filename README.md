<h1 align ="center"> Note Taker </h1>

Link to [Heruko page](https://note-taker-app86.herokuapp.com/).
<br>
Link to [Github page](https://github.com/ksfallon/Note-Taker).
### **TABLE OF CONTENTS:**
1. [Overview of Team Profile Generator](#overview-of-tasks)
2. [Files & Modules needed to start](#files-and-modules-needed-to-start)
3. [Creating the Server & htmlRoutes](#the-serverjs-and-htmlroutesjs-files)
4. [Creating the middleware & the apiRoutes](#the-middlewarejs-and-apiroutesjs-files)
5. [License for Repository](#license)

## 1. Overview of Tasks
 - The goal of the Note Taker app is to allow the user to **write** AND **save** notes on this webpage. We are given the front-end code and need to set up the back-end to get the webpage running. 
 - The home page must link to the notes.html page with the "Get Started" button.
 - On the notes page the user is presented with pre-existing notes in the left-hand column, and empty fields to enter in a new note (with a new title) in the right-hand column.
 - After the user enters a new note *title* and then *text* and click the save button, the new note appears at the bottom of the list in the left-hand column. And they can clear these two areas to create a new note with the *plus* button located next to the save button on the top right-hand side
 - When an old note is clicked on, it appears in the right-hand column and the text is visible.

## 2. Files and Modules needed to start
 **Modules used:**
<br>
 Imported [express](https://www.npmjs.com/package/express) and [uniqid](https://www.npmjs.com/package/uniqid).

 **Back-end Files added to begin Homework:**
 1. The first file I added was the *server.js* file to the main *NOTE-TAKER* folder. 
 2. Then I created the *routes* folder to hold my *apiRoutes.js* and *htmlRoutes.js* files. 
 3. I also added a file called *middleware.js* in the *db* (database) file.
## 3. The server.js and htmlRoutes.js Files
### server.js
- We are using npm express to connect to our server. Once "npm i express" is done we can require it in the server.js. Then we create const *app* that equals *express()* and it tells node js that I am creating an *express* server. The last const we need is our *PORT* which is where my *app* is listening. We set it equal to process.env.PORT || 8080 - the process.env.PORT is necessary because Heruko determines what port the app is listening on so this allows the PORT to change. Otherwise when we work with it localhost 8080 is just fine.
<br>
- next we use *app.use()* to set up *express* to handle data parsing.
`app.use(express.urlencoded({ extended: true })); //parses urlencode data
app.use(express.json()); // parses JSON
app.use(express.static('public')); // parses the data from our public folder`
<br>
- We have to require our two types of routes - api and html - make sure to always put html first because otherwise api can block html links. Html are the user side and take them between website pages while api routes are for getting, sending and deleting data.
<br>
`require('./routes/htmlRoutes')(app); `
<br>
`require('./routes/apiRoutes')(app);  `
- Lastly, we start the server on the *PORT* using the *listen* method.
`app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});`
<br>
<br>
### htmlRoutes.js
- The htmlRoutes.js is the next logical step since the front-end code is done and we just need to connect that code to the server.
- As shown above in the server.js, the requiring of the htmlRoutes.js is what connects the two files on the server.js side. On the htmlRoutes.js side we place our *router.get()* functions in a *module.exports(router)*.
- In our *router.get()* we start the html link off of the home page that we want to direct the users too and thats '/notes' always with a forward slash first and then we use the request and respond parameters. The response will use the method *sendFile*, **path** and the method *join* to connect the notes.html file to the homepage (_dirname). Then the notes.html page will display with the '/note' from the homepage.
`    router.get('/notes', (req, res) => {
      console.log('hit / notes html route!')
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });`
- I created a *router.get('*')* for the default page but it caused a connection error when accessing the website so it is commented out for now. 

## 4. The middleware.js and apiRoutes.js Files
**The bulk of the back-end code is located in my middleware.js and apiRoutes.js files**

## 5. License
Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).

notes - public folder is for all of the front end work