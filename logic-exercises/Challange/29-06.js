function palindromo(strg) {
  const newString = strg.split('').filter(el => (el !== " ")).reverse()
    .join('')
  return strg.split('').filter(el => (el !== " ")).join('') === newString
}

console.log(palindromo('subi no onibus'))

function anagrama(str1, str2) {
  const newString1 = str1.split('')
     .sort()
    .filter(el => (el !== " "))
    .join('')
  const newString2 = str2.split('')
    .sort()
    .filter(el => (el !== " "))
    .join('')
  return newString1 === newString2
}

console.log(anagrama('roma b', 'b amor'))