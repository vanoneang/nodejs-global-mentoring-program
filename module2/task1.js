// process.stdin.setEncoding('utf8')

// process.stdin.on('readable', () => {
//   let str 

//   while ((str = process.stdin.read()) !== null) {
//     const pureStr = str.slice()
//     const reverseStr = pureStr.split('').reverse().join('')
//     process.stdout.write(reverseStr)
//   }
// })

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on('line', function(line){
  const pureStr = line.slice()
  const reverseStr = pureStr.split('').reverse().join('')
  process.stdout.write(reverseStr)
})