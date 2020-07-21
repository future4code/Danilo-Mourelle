function palíndromo(strg: string): boolean {
  const newString = strg.split('').filter(el => (el !== " ")).reverse()
    .join('')
  return strg.split('').filter(el => (el !== " ")).join('') === newString
}



function anagrama(str1: string, str2: string): boolean {
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

