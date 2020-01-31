import comprarCarta from './naoMexer.js'
// NÃO REMOVA ESTA LINHA

/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

console.log("Bem-vindo ao jogo de BlackJack")
if (confirm("Quer iniciar uma nova rodada?")) {
  //Processo de sorteio das cartas
  console.log("Sorteando as cartas")
  const cartaUsuario1 = comprarCarta(), cartaUsuario2 = comprarCarta()
  const cartaComputer1 = comprarCarta(), cartaComputer2 = comprarCarta()

  //Fazendo a soma dos valores das cartas de cada jogador
  const somaUsuario = cartaUsuario1.valor + cartaUsuario2.valor
  const somaComputer = cartaComputer1.valor + cartaComputer2.valor

  //Escrevendo no console as cartas e pontuações
  console.log("Usuário - cartas: " + cartaUsuario1.texto +" "+ cartaUsuario2.texto + " - Pontuação " + somaUsuario)
  console.log("Computador - cartas: " + cartaComputer1.texto +" "+ cartaComputer2.texto + " - Pontuação " + somaComputer)

  //Fazendo a verificação e escrevendo o vencedor
  if(somaComputer>somaUsuario){
    console.log("Resultado: Computador vencedor")
  }
  else if(somaUsuario>somaComputer){
    console.log("Resultado: Usuário vencedor")
  }
  else{
    console.log("Resultado: Empate")
  }
}

console.log("O jogo acabou, até a próxima^^")