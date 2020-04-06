export function checaPalindromo(frase) {
  let fraseUnida = frase.toLowerCase().split(' ').join('')
  let palindromo = fraseUnida.split('').reverse().join('')

  if (palindromo === fraseUnida){
    return true
  }
  else {
    return false
  }
}
