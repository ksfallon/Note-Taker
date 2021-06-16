<h1 align ="center"> Note Taker </h1>

Link to [Heruko page](https://note-taker-app86.herokuapp.com/).
<br>
Link to [Github page](https://github.com/ksfallon/Note-Taker).
### **TABLE OF CONTENTS:**
1. [Overview of Team Profile Generator](#1-overview-of-tasks)
2. [Files & Modules needed to start](#2-files-and-modules-needed-to-start)
3. [Creating the Server & htmlRoutes](#3-the-serverjs-and-htmlroutesjs-files)
4. [Creating the middleware](#4-the-middlewarejs-file)
5. [Creating the apiRoutes](#5-the-apiroutesjs-file)
6. [Screen Shots of App with Inspect/Console](#6-screen-shots-of-app)
7. [License for Repository](#7-license)

<br>
<br>

## 1. Overview of Tasks
 - The goal of the Note Taker app is to allow the user to **write** AND **save** notes on this webpage. We are given the front-end code and need to set up the back-end to get the webpage running. 
 - The home page must link to the notes.html page with the "Get Started" button.
 - On the notes page the user is presented with pre-existing notes in the left-hand column, and empty fields to enter in a new note (with a new title) in the right-hand column.
 - After the user enters a new note *title* and then *text* and click the save button, the new note appears at the bottom of the list in the left-hand column. And they can clear these two areas to create a new note with the *plus* button located next to the save button on the top right-hand side
 - When an old note is clicked on, it appears in the right-hand column and the text is visible.
<br>
<br>

## 2. Files and Modules needed to start
 **Modules used:**
<br>
 Imported [express](https://www.npmjs.com/package/express) and [uniqid](https://www.npmjs.com/package/uniqid).

 **Back-end Files added to begin Homework:**
 1. The first file I added was the *server.js* file to the main *NOTE-TAKER* folder. 
 2. Then I created the *routes* folder to hold my *apiRoutes.js* and *htmlRoutes.js* files. 
 3. I also added a file called *middleware.js* in the *db* (database) file.
<br>
<br>

## 3. The server.js and htmlRoutes.js Files
### server.js
- We are using npm express to connect to our server. Once "npm i express" is done we can require it in the server.js. Then we create const *app* that equals *express()* and it tells node js that I am creating an *express* server. The last const we need is our *PORT* which is where my *app* is listening. We set it equal to process.env.PORT || 8080 - the process.env.PORT is necessary because Heruko determines what port the app is listening on so this allows the PORT to change. Otherwise when we work with it localhost 8080 is just fine.

- next we use *app.use()* to set up *express* to handle data parsing.

`app.use(express.urlencoded({ extended: true })); //parses urlencode data
app.use(express.json()); // parses JSON
app.use(express.static('public')); // parses the data from our public folder`

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
<br>
<br>

## 4. The middleware.js File
**The bulk of the back-end code is located in my middleware.js and apiRoutes.js files**
- In this file I am requiring *fs* *uniqid* and *util* to create the middleware for my api routes instead of putting all of this code in the apiRoutes file.
- Promises are a type of callback but they handle objects much better. So I used the *util* and *fs* modules to 'promisify' when the notes file is read or written. 
`const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)`
- I created the class *MiddleDb* which will set up the file system paths and how to encode the data. Which the apiRoutes will then use to communicate with the server and the html by get/send/delete data. 
- *MiddleDb* has 4 functions: *readFile()*,  *writeFile(note)*, *getNotes()* and *deleteNote(deleteId)*
1. *readFile()* - is very straightforward and uses the *readAsync* const to read the file *db.json* (with the path to that file) using the 'utf8' character encoding.

2. *getNotes()* - even though it is the third function it is called in *writeFile()* and should be explained first.
- first it returns the file that was read in the *readFile()*, **then** it concats (joins) the notes in the file into an array called *notesARR*. It has to use the JSON because we are dealing with data (this time is happens to be a json file) and since the data is a string and we need them to be objects, because arrays stores elements such as objects, we must parse the data which converts strings into objects.

` getNotes(){
     return this.readFile().then(notes => { let notesARR = []
         notesARR = notesARR.concat(JSON.parse(notes))
         return notesARR})}`

3. *writeFile(note)* - 
- Each note is put through this function. It takes the note that is sent to it from the apiRoutes.js, it is the req.body (requested data, the new note that was input by the user into the website which is an object containing a title and text) and first thing that is done is a unique id is assigned to this new note using the uniqid module:
`note.id = uniqid()`
<br>
Next a const *notes* is created that is sent to *this.getNotes(). Instead of using a "then" statement I use an *await* and *async*:
`async writeFile(note){
    note.id = uniqid()
    const notes = await this.getNotes()`
<br>
which tells the function not to move on until this is done, THEN it can go to the next line of code, *async* just needs to be declared to show that it is a function that returns a promise. 
- And the next line pushes our new note into our array (that was created with getNotes).
<br>
- Finally, we call on module *fs* and method *writeFileSync* which will synchronously write our new array to the db.json file, replacing the old array, and the data (json) which is currently an object will be converted into a string using *stringify*.
**With fs its important to include `err => {if (err) throw err;` to catch any potential errors that might happen when writing files**
<br>
4. The last function is *deleteNote(deleteId)*
- The deleteId is sent to the function from the apiRoutes.js and it is the req.params.id (the requested parameter based on id, the note that the user clicked the trashcan button on to remove/delete this note from their list).
- We call on the const *noteFile* which is the db.json and *map* it: where note represents the individual objects in our array, and if note.id equals deletedID then we want to *splice* this note from our *noteFile* array.
- **It should remove the specific id but for some reason it is removing the first item in the array instead so the final slice is commented out until i debug it**
<br>
<br>

## 5. The apiRoutes.js File
- Now we just need to create the api routes so they can use the middleware functions to get/save/delete the data. 
1. We need to require middleware.js and since it is a class its const is capitalized *Middle* . All of our get, post and delete functions are within a module.exports function. I run router through module.exports because I am using the router function of express.
2. The first thing we want to do is **get** (or request) our data from our db.json file. So first we specifiy the html link '/api/notes' which if we type into our browser would just show the array and no html or css structure. we set the parameters to request and respond and in the function we set a const *notes* equal to *Middle.readFile()* and then we tell the server to respond using json(notes) so the front-end knows the function is complete. 
-*Middle.readfile() - so we can as that specific function to run*.
<br>
`  router.get('/api/notes', async (req, res) => {
    const notes = await Middle.readFile();
    res.json(notes)
  })`
  <br>
  using the *async* and *await* again instead of the *then* to declare the promise.
<br>
3. Next, we want to **post** which is going to send the data from db.json to the server to update the data displayed on the website.
-**post** starts very similar to **get** -specificy the /api/html and set the req and res parameters:
<br>
  `router.post('/api/notes', (req, res) => {
    const note = req.body
    Middle.writeFile(note)
    res.end()})`
<br>
- again setting a const *note* (now its singular) to the request body.
- call on the Middle.writeFile(note) sending the note through the middleware. So this new note entered into the html will be sent to the middleware.js writeFile() to be given a new id and to be added to the notes array.
4. route.delete is setup very similarly but for our html link we want to call on a specific id so '/api/notes/:id" is our path, and we call on our req and res parameters. I created a const called *deleteId* that is called in the deleteNote function in middleware.js. And *deleteId* is equal to our request route parameters this time to get that specific id. And this is done because we want the specific note that was selected to be deleted and thats based on its unique id.
<br>
<br>

## 6. Screen Shots of App
First shows the webpage with no notes, and you can see in the console the notes array is empty
<br>

![no-notes](https://github.com/ksfallon/Note-Taker/blob/main/Assets/No-Notes.png)
<br>
Second shows the webpage with three saved notes, nothing in the add notes area, and the console with a notes array of 3
<br>

![listOf3](https://github.com/ksfallon/Note-Taker/blob/main/Assets/listOf3.png)
<br>
Third shows the webpage when one of the saved notes is click, and it displayed on the right side of the screen.
<br>

![old-note-display](https://github.com/ksfallon/Note-Taker/blob/main/Assets/old-note-display.png)
<br>
Fourth shows the webpage when an item is deleted, and the notes array in the console has gone from 3 to 2.
<br>

![delete](https://github.com/ksfallon/Note-Taker/blob/main/Assets/delete.png)
<br>

## 7. License
Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).
