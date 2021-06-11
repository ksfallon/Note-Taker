const fs = require('fs')
const uniqid = require('uniqid')
const util = require('util')

// changing the fs read and fs write files to asynchronous promises

const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)

class MiddleDb {

}

module.exports = new MiddleDb()