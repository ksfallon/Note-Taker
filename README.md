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
6. [License for Repository](#6-license)

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

## 4. The middleware.js File
**The bulk of the back-end code is located in my middleware.js and apiRoutes.js files**
- In this file I am requiring *fs* *uniqid* and *util* to create the middleware for my api routes instead of putting all of this code in the apiRoutes file.
- Promises are a type of callback but they handle objects much better. So I used the *util* and *fs* modules to 'promisify' when the notes file is read or written. 
`const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)`
- I created the class *MiddleDb* which will set up the file system paths and how to encode the data. Which the apiRoutes will then use to communicate with the server and the html by get/send/delete data. 
- *MiddleDb* has 4 functions: *readFile()*,  *writeFile(note)*, *getNotes()* and *deleteNote(deleteId)*
1. *readFile()* - is very straightforward and uses the *readAsync* const to read the file *db.json* (with the path to that file) using the 'utf8' character encoding.
<br>
2. *getNotes()* - even though it is the third function it is called in *writeFile()* and should be explained first.
- first it returns the file that was read in the *readFile()*, **then** it concats (joins) the notes in the file into an array called *notesARR*. It has to use the JSON because we are dealing with data (this time is happens to be a json file) and since the data is a string and we need them to be objects, because arrays stores elements such as objects, we must parse the data which converts strings into objects.
` getNotes(){
     return this.readFile().then(notes => { let notesARR = []
         notesARR = notesARR.concat(JSON.parse(notes))
         return notesARR})}`

3. *writeFile(note)* - 
- Each note is put through this function and first thing that is done is a unique id is assigned to each note using the uniqid module:
<br>
`note.id = uniqid()`
<br>
Next a const *notes* is created that is sent to *this.getNotes(). Instead of using a "then" statement I use an *await*:
<br>
`const notes = await this.getNotes()`
<br>
which tells the function not to move on until this is done, THEN it can go to the next line of code. And the next line pushes our new note into our array (that was created with getNotes).
<br>
- Finally, we call on module *fs* and method *writeFileSync* which will synchronously write our new array to the db.json file, replacing the old array, and the data (json) which is currently an object will be converted into a string using *stringify*.
- **With fs its inmportant to include `err => {if (err) throw err;` to catch any potential errors that might happen when writing files**

## 5. The apiRoutes.js File
## 6. License
Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).

notes - public folder is for all of the front end work