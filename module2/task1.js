process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  let str 

  while ((str = process.stdin.read()) !== null) {
    const pureStr = str.slice()
    const reverseStr = pureStr.split('').reverse().join('')
    process.stdout.write(reverseStr)
  }
})