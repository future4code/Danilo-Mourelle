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
  let cartasUsuario = [comprarCarta(), comprarCarta()]
  let cartasComputer = [comprarCarta(), comprarCarta()]

  //Verificação de dois ases (A), e refazendo o sorteio caso seja
  while ((cartasComputer[0].valor === 11 && cartasComputer[1].valor === 11) || (cartasUsuario[0].valor ===11 && cartasUsuario[1].valor === 11)) {
    cartasUsuario = [comprarCarta(), comprarCarta()]
    cartasComputer = [comprarCarta(), comprarCarta()]
  }

  //CICLO DE COMPRA DA CARTA DO USUARIO
  let textoTotalUsuario="", somaUsuario=0, querOutraCarta=true
  while (querOutraCarta !== false && somaUsuario <=21) {
    //FAZENDO O CONCAT DOS TEXTOS E SOMA DOS VALORES DAS CARTAS
    //Usuário
    textoTotalUsuario = ""
    somaUsuario = 0
    for (let index = 0; index < cartasUsuario.length; index++) {
      textoTotalUsuario += " " + cartasUsuario[index].texto;
      somaUsuario += cartasUsuario[index].valor;
    }

    if (somaUsuario <= 21) {
      //Informando as cartas e questionando se acrescenta
      querOutraCarta = confirm("Suas cartas são:" + textoTotalUsuario + ". A carta revelada do computador é " + cartasComputer[0].texto + ".\nDeseja comprar mais uma carta")
      if (querOutraCarta) {
        cartasUsuario.push(comprarCarta())
      }
    }
  }

  //FAZENDO A SOMA DO COMPUTADOR NO MOMENTO QUE A RODADA COM USUARIO ACABA
  let textoTotalComputer="", somaComputer=0
  for (let index = 0; index < cartasComputer.length; index++) {
    textoTotalComputer += " " + cartasComputer[index].texto;
    somaComputer += cartasComputer[index].valor;
  }
  //SE O USUARIO PAROU DE COMPRAR SEM ESTOURAR, INICA O CICLO DE COMPRA DO COMPUTADOR
  if (somaUsuario <= 21 && querOutraCarta === false) {
    //CICLO DE COMPRA DA CARTA DO COMPUTADOR ENQUANTO ELE TIVER PONTUAÇÃO MENOR QUE USUÁRIO
    while (somaComputer < somaUsuario) {
      //Compra da carta para o Computer
      cartasComputer.push(comprarCarta())
      //FAZENDO O CONCAT DOS TEXTOS E SOMA DOS VALORES DAS CARTAS
      //Computer
      textoTotalComputer = ""
      somaComputer = 0
      for (let index = 0; index < cartasComputer.length; index++) {
        textoTotalComputer += " " + cartasComputer[index].texto;
        somaComputer += cartasComputer[index].valor;
      }
    }
  }

  //Escrevendo no console as cartas e pontuações
  console.log("Suas cartas são:" + textoTotalUsuario + ". Sua pontuação é " + somaUsuario)
  console.log("As cartas do computador são:" + textoTotalComputer + ". A pontuação do computador é " + somaComputer)

  //Fazendo a verificação e escrevendo o vencedor
  if ((somaUsuario === somaComputer) && somaUsuario<=21) {
    console.log("Resultado: Empate")
  }
  else if (somaUsuario > somaComputer && somaUsuario<=21 || somaComputer>21) {
    console.log("Resultado: Usuário vencedor")
  }
  else {
    console.log("Resultado: Computador vencedor")
  }
}

console.log("O jogo acabou, até a próxima^^")

