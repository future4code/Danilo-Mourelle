export function primeirasLetrasParaMaiusculas(frase) {
  let fraseEstruturada = frase.toLowerCase().split(' ')

  let primeiraLetraMaiuscula = fraseEstruturada.map(palavra => {
    let novaPalavra = palavra[0].toUpperCase() + palavra.slice(1)
    return novaPalavra
  })

  primeiraLetraMaiuscula = primeiraLetraMaiuscula.join(' ')
  return primeiraLetraMaiuscula
}
