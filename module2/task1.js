const str = '12345 678'
const str1 = 'test data'

function strReverse(str) {
  return str.split('').reverse().join('')
}

console.log(strReverse(str));
console.log(strReverse(str1));

