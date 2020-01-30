
//INTERPRETAÇÃO DE CÓDIGO
/*  
EXECÍCIO 1
Utilizando a estrutura de loop for, ele está somando de 1 a 14, com incremento de 1 dento da variável sum.
O resultado impresso deve ser 105
*/

/* 
EXERCÍCIO 2
a. O comando push adiciona mais um elemnto detro do array novaLista
b. [10,15,25,30]
c. para valores de 3 seria impresso [12,15,18,21,27,30] - para valores de 4 seria impresso [12]
*/

//DESAFIO
/*
DESAFIO 1
Teria a impressão:
0
00
000
0000
*/

//ESCRITA DE CÓDIGO
/* 
EXERCÍCIO 3
*/
const arrayOriginal = [80, 30, 13, 40, 60, 21, 70, 120, 90, 103, 110, 55]
//A
let maior = arrayOriginal[0], menor = arrayOriginal[0]
for (const numero of arrayOriginal) {
  if (numero > maior) {
    maior = numero
  }
  if (numero < menor) {
    menor = numero
  }
}
console.log("O maior número é", maior, "e o menor númeor é", menor)

//B
let novoArray = []
for (const elemento of arrayOriginal) {
  novoArray.push(elemento / 10)
}
console.log(novoArray)

//C
novoArray = []
for (const elemento of arrayOriginal) {
  if (elemento % 2 === 0) {
    novoArray.push(elemento)
  }
}
console.log(novoArray)

//D
for (let i = 0; i < arrayOriginal.length; i++) {
  console.log("O elemento do índex", i.toString(), "é", arrayOriginal[i].toString())
}

/*
DESAFIO 2
 */
let numeroPensado = Number(prompt("Digite o número que deverá ser acertado"))
while (isNaN(numeroPensado)) {
  numeroPensado = Number(prompt("Você precisa digitar um número válido"))
}
console.log("-----Início do Jogo-----")

let numeroChutado = Number(prompt("Valendo sua primeira tentativa"))
while (isNaN(numeroChutado)) {
  numeroChutado = Number(prompt("Você precisa digitar um número válido"))
}
console.log("Numero chutado foi", numeroChutado)

let tentativas=1
while (numeroPensado !== numeroChutado) {
  console.log("Errou kkkk")
  if (numeroPensado < numeroChutado) {
    numeroChutado = Number(prompt("Tente um número menor"))
    while (isNaN(numeroChutado)) {
      numeroChutado = Number(prompt("Você precisa digitar um número válido"))
    }
  }
  else {
    numeroChutado = Number(prompt("Tente um número maior"))
    while (isNaN(numeroChutado)) {
      numeroChutado = Number(prompt("Você precisa digitar um número válido"))
    }
  }
  console.log("Numero chutado foi", numeroChutado)
  tentativas++
}
console.log("Acertou mizeravei")
console.log("Quantidade de tentativas necessárias:", tentativas)

/*
DESAFIO 3
 */
let numeroPensado = Math.floor((Math.random() * 100) + 1)
console.log("-----Início do Jogo-----")

let numeroChutado = Number(prompt("Valendo sua primeira tentativa"))
while (isNaN(numeroChutado)) {
  numeroChutado = Number(prompt("Você precisa digitar um número válido"))
}
console.log("Numero chutado foi", numeroChutado)

let tentativas=1
while (numeroPensado !== numeroChutado) {
  console.log("Errou kkkk")
  if (numeroPensado < numeroChutado) {
    numeroChutado = Number(prompt("Tente um número menor"))
    while (isNaN(numeroChutado)) {
      numeroChutado = Number(prompt("Você precisa digitar um número válido"))
    }
  }
  else {
    numeroChutado = Number(prompt("Tente um número maior"))
    while (isNaN(numeroChutado)) {
      numeroChutado = Number(prompt("Você precisa digitar um número válido"))
    }
  }
  console.log("Numero chutado foi", numeroChutado)
  tentativas++
}
console.log("Acertou mizeravei")
console.log("Quantidade de tentativas necessárias:", tentativas)