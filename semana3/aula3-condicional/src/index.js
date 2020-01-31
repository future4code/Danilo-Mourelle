
//INTERPRETAÇÃO DE CÓDIGO
/*  
EXECÍCIO 1
Pede para o usuário inserir um número, o qual será testado para sendo par, e se for exibe mensagem "Passou no teste", se não exibe mensagem "Não passou no teste"
*/

/* 
EXERCÍCIO 2
a. Serve para selecionar o preço de uma fruta específica dentro de uma lista de fruta
b. O preço da fruta Maçã é R$ 2.25
c. 2*3.5 + 1*2.25 + 3*5 + 1*0.3 = 24.55
d. O programa entraria no case "Pêra", mas por não ter o break, seguiria adiante entrando o default e com isso alterando o valor de preco para 5
*/

/*
EXERCÍCIO 3
Caso se use o strict mode, haverá uma mensagem de falha uma vez que a variável mensagem é declarada dentro do bloco do primeiro if (numero1>0 $$ numero2>0).
Caso não seja usado, a mensagem mostrada será "Número 1 é menor ou igual ao 2" lembrando que os blocos if e else internos conseguem acessar variávei declaradas no escopo do primeiro if
*/

//ESCRITA DE CÓDIGO
/* 
EXERCÍCIO 4
*/
// A 
const num1=Number(prompt("Insira um número"))
const num2=Number(prompt("Digite outro número"))

if(num1>num2){
  console.log(num1, num2)
}
else if(num1 === num2){
  console.log("Os números são iguais") // comentar mais
}
else{
  console.log(num2, num1)
}

//B
const num1 = Number(prompt("Insira um número"))
const num2 = Number(prompt("Digite outro número"))
const num3 = Number(prompt("Digite outro número"))

if (num1 >= num2 && num1 >= num3) {
  if (num2 > num3) {
    console.log(num1, num2, num3)
  }
  else{
    console.log(num1, num3, num2)
  }
}
else if (num2 >= num1 && num2 >= num3) {
  if(num1 > num3){
    console.log(num2, num1, num3)
  }
  else{
    console.log(num2, num3, num1)
  }
}
else if(num3 >= num2 && num3 >= num1) {
  if(num1 > num2){
    console.log(num3, num1, num2)
  }
  else{
    console.log(num3, num2, num1)
  }
}

// C
const num1 = Number(prompt("Insira um número"))
const num2 = Number(prompt("Digite outro número"))
const num3 = Number(prompt("Digite outro número"))

if (num1 === num2 && num1 === num3) {
  console.log("Todos os números são iguais, insira pelo menos 1 diferente")
}
else {
  if (num1 >= num2 && num1 >= num3) {
    if (num2 > num3) {
      console.log(num1, num2, num3)
    }
    else{
      console.log(num1, num3, num2)
    }
  }
  else if (num2 >= num1 && num2 >= num3) {
    if(num1 > num3){
      console.log(num2, num1, num3)
    }
    else{
      console.log(num2, num3, num1)
    }
  }
  else if(num3 >= num2 && num3 >= num1) {
    if(num1 > num2){
      console.log(num3, num1, num2)
    }
    else{
      console.log(num3, num2, num1)
    }
  }
} 

/*
EXERCÍCIO 5
*/
//A
/* Link do compartilhamento: https://1drv.ms/u/s!ArCPBn9dSdQc-F3MnRmnCTVqnyX8?e=szObaN */
//B
const ossos=prompt("O seu animal apresenta coluna vertebral? [s/n]")
let resultado=""

if(ossos ==="s"){
  const pelos=prompt("Seu animal tem pelo?[s/n]")
  if(pelos==="s") {
    const racionalidade=prompt("Seu animal é racional? [s/n]")
    if(racionalidade==="s"){
      resultado="Seu animal é um vertebrado, mamífero e racional. Seu animal é o ser humano"
      console.log(resultado)
    }
    else if(racionalidade==="n"){
      resultado="Seu animal é um vertebrado, mamífero e irracional. Seu animal NÃO é humano"
      console.log(resultado)
    }
  }
  else if(pelos==="n"){
    const penas=prompt("Seu animal possui penas? [s/n]")
    if(penas==="s"){
      resultado="Seu animal é um vertebrado e uma ave. (pássaros)"
      console.log(resultado)
    }
    else if(penas==="n"){
      const terrestre=prompt("Seu animal é terrestre? [s/n]")
      if(terrestre==="n"){
        resultado="Seu animal é um vertebrado, aquático. (peixes)"
        console.log(resultado)
      }
      else if(terrestre==="s"){
        const anfibio=prompt("Seu animal tem seu desenvolvimento parcialmente aquático? [s/n]")
        if(anfibio==="s"){
          resultado="Seu animal é um vertebrado, anfíbio. (sapos)"
          console.log(resultado)
        }
        else if(anfibio==="n"){
          resultado="Seu animal é um vertebrado, réptil. (jacaré)"
          console.log(resultado)
        }
      }
    }
  }
}
else if(ossos==="n"){
  resultado="Seu animal é um invertebrado"
  console.log(resultado)
}
if(resultado===""){
  console.log("Você inseriu uma resposta invalida, F5 para recomeçar")
}

/*
DESAFIOS
*/
const nome = prompt("Nome completo:"), tipoJogo = prompt("IN para jogo internacional, DO para jogo doméstico"), etapa = prompt("SF para semi-final, DT para terceiro lugar, FI para final"),
  categoria = Number(prompt("1, 2, 3 ou 4")), quantidade = Number(prompt("Quantidade de ingressos que deseja adquirir"))
let valorFinal, valorIngressoIndividual, categoriaValida = true, tipoJogoValido=true, tipoJogoExtenso="Nacional", etapaJogoExtenso, moeda="R$", etapaValida=true

if (etapa === "SF") {
  etapaJogoExtenso="Semi-Final"
  switch (categoria) {
    case 1:
      valorIngressoIndividual = 1320
      break;
    case 2:
      valorIngressoIndividual = 880
      break;
    case 3:
      valorIngressoIndividual = 550
      break;
    case 4:
      valorIngressoIndividual = 220
      break;
    default:
      categoriaValida = false
      console.log("Categoria escolhida inexistente")
      break;
  }
}
else if (etapa === "DT") {
  etapaJogoExtenso="Decisão Terceiro Lugar"
  switch (categoria) {
    case 1:
      valorIngressoIndividual = 660
      break;
    case 2:
      valorIngressoIndividual = 440
      break;
    case 3:
      valorIngressoIndividual = 330
      break;
    case 4:
      valorIngressoIndividual = 170
      break;
    default:
      categoriaValida = false
      console.log("Categoria escolhida inexistente")
      break;
  }
}
else if (etapa === "FI") {
  etapaJogoExtenso="Final"
  switch (categoria) {
    case 1:
      valorIngressoIndividual = 1980
      break;
    case 2:
      valorIngressoIndividual = 1320
      break;
    case 3:
      valorIngressoIndividual = 880
      break;
    case 4:
      valorIngressoIndividual = 330
      break;
    default:
      categoriaValida = false
      console.log("Categoria escolhida inexistente")
      break;
  }
}
else {
  etapaValida=false
  console.log("Etapa do campeonato incompatível")
}
if (categoriaValida === true && !isNaN(quantidade) && etapaValida===true) {
  valorFinal = valorIngressoIndividual * quantidade
  if (tipoJogo === "IN") {
    tipoJogoExtenso="Internacional"
    moeda="U$"
    valorIngressoIndividual *= 4.1
    valorFinal *= 4.1
  }
  else if(tipoJogo!=="IN" && tipoJogo!=="DO"){
    tipoJogoValido=false
    console.log("Tipo do jogo inexistente")
  }                                                                  

  if(tipoJogoValido===true){
    console.log("--- Dados da compra ---")
    console.log("Nome do cliente:", nome)
    console.log("Tipo do jogo:", tipoJogoExtenso)
    console.log("Etapa do Jogo:", etapaJogoExtenso)
    console.log("Categora:", categoria)
    console.log("Quantidade de Ingressos:", quantidade, "ingressos")
    console.log("---Valores---")
    console.log("Valor do Ingresso:", moeda, valorIngressoIndividual)
    console.log("Valor total:", moeda, valorFinal)

  }
}
else if(isNaN(quantidade)){
  console.log("Quantidade de ingressos escolhidas incompatível")
}





