const fs = require('fs')
const path = require('path')
const csv = require("csvtojson/v2")

const csvFile = path.join(__dirname, 'nodejs-hw1-ex1.csv')
const txtFile = path.join(__dirname, 'task2.txt')

csv()
  .fromFile(csvFile)
  .subscribe(
    (json) => {
      fs.appendFile(txtFile, JSON.stringify(json) + '\n', (err) => {
        if (err) throw err;
        console.log('Saved!');
      })
    }, 
    () => console.log('error'), 
    () => console.log('success')
  )
