const fs = require('fs') //writing the file
const uniqid = require('uniqid') //generates the unique ID for each note
const util = require('util') //util are Utilities
const noteFile = require('./db.json')
// changing the fs read and fs write files to asynchronous promises

const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)

class MiddleDb {
    // this sets up the file system path and how to encode the data
readFile(){
    return readAsync("./db/db.json", "utf8")
    //util.promisify(fs.readFile("/db/db.json", "utf8"))
}
// this sets up file system path and stringifies the JSON
async writeFile(note){
    note.id = uniqid()
    console.log('about to write this note to db.json ', note)
    const notes = await this.getNotes()
    notes.push(note)
    console.log('notes ', notes)
    return fs.writeFileSync("db/db.json", JSON.stringify(notes)), err => {
        if (err) throw err;
    }
}
 
 getNotes(){
     return this.readFile() 
     .then(notes => {
         let notesARR = []
         notesARR = notesARR.concat(JSON.parse(notes))
         return notesARR
     })
 }

 deleteNote(deleteId){
    noteFile.map(note => {
        if (note.id === deleteId) {
        //   noteFile.splice({id: deleteId}, 1);
          console.log("what is deleteID? ", deleteId)
          console.log("what is note.id ", note.id)
        //   console.log("what am i actually splicing ", noteFile.splice(value.id, 1))
        }
      })
    fs.writeFileSync("db/db.json", JSON.stringify(noteFile)), err => {
        if (err) throw err;
        console.log("note was deleted, new list: ", noteFile);
 }
}

}

module.exports = new MiddleDb()