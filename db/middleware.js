const fs = require('fs')
const uniqid = require('uniqid')
const util = require('util')

// changing the fs read and fs write files to asynchronous promises

const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)

class MiddleDb {
    // this sets up the file system path and how to encode the data
readFile(){
    return readAsync("db/db.json", "utf8")
}
// this sets up file system path and stringifies the JSON
writeFile(data){
    return writeAsync("db/db.json", JSON.stringify(data))
}

getNotes(){
    return this.readFile() 
    .then(notes => {
        let notesARR;
        notesARR = [].concat(JSON.parse(notes))
        return notesARR
    })
}
}

module.exports = new MiddleDb()